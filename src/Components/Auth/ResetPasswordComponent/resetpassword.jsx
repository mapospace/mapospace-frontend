import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Button from "../../Common/Button";
import Snackbar from "../../Common/snackbar";
import Axios from "axios";
import Icon from "../../Common/Icon";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ResetPassword() {
  const { id } = useParams(); // Extract the id from the route
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  useEffect(() => {

  }, [id]);

  const validateForm = (password, passwordAgain) => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    else if (!/[A-Z]/.test(password))
      newErrors.password = "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(password))
      newErrors.password = "Password must contain at least one lowercase letter";
    else if (!/[0-9]/.test(password))
      newErrors.password = "Password must contain at least one number";
    else if (!/[!@#$%^&*]/.test(password))
      newErrors.password = "Password must contain at least one special character";

    if (!passwordAgain) {
      newErrors.passwordAgain = "Please confirm your password";
    } else if (password !== passwordAgain) {
      newErrors.passwordAgain = "Passwords do not match";
    }

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }
  };

  const handleTogglePassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleToggleNewPassword = () => {
    setNewPassword(!newPassword);
  };

  const handlePasswordAgainChange = (e) => {
    setPasswordAgain(e.target.value);
    if (errors.passwordAgain) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordAgain: null }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm(password, passwordAgain);

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        password: password,
        passwordAgain: passwordAgain,
      };

      Axios.post(
        `${process.env.REACT_APP_BASEURL}/user/reset-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        }
      )
        .then((response) => {
          setSnackbar({
            isVisible: true,
            message: response.data.message || "Password reset successfully!",
            type: "success",
          });
          setErrors({});
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            "Error submitting form. Please try again later.";
          setSnackbar({
            isVisible: true,
            message: errorMessage,
            type: "error",
          });
        });
    } else {
      setErrors(newErrors);
    }

    setTimeout(() => {
      setSnackbar({ isVisible: false, message: "", type: "" });
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };

  return (
    <div className="flex items-center justify-center font-poppins ">
      {/* <Icon position="absolute" top="15px" left="15px" width="40px" height="40px" /> */}
      <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-md border-1 border-t-2 w-[500px] mt-20">
        <Icon mb="20px" width="50px" height="50px" />
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
        </div>
        <div className="w-full max-w-md mt-2 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={newPassword ? "text" : "password"}
                  className={`mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={handleToggleNewPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {newPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2 mt-4 relative">
              <label
                htmlFor="passwordAgain"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm new password
              </label>
              <div className="mt-1 relative">
                <input
                  id="passwordAgain"
                  type={confirmPassword ? "text" : "password"}
                  className={`mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.passwordAgain ? "border-red-500" : "border-gray-300"
                    }`}
                  value={passwordAgain}
                  onChange={handlePasswordAgainChange}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {confirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.passwordAgain && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.passwordAgain}
                </p>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Button label="Submit" width="40%" />
            </div>
          </form>
        </div>
      </div >
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={handleCloseSnackbar}
      />
    </div >
  );
}
