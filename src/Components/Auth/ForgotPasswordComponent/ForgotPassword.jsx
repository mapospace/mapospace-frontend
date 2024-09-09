import React, { useState } from "react";
import Button from "../../Common/Button";
import Snackbar from "../../Common/snackbar";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Icon from "../../Common/Icon";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const validateForm = (email) => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm(email);

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        businessEmail: email,
      };

      Axios.post(`${process.env.REACT_APP_BASEURL}/user/forget-password`, formData)
        .then((response) => {
          const { message, success } = response.data;
          setSnackbar({
            isVisible: true,
            message: response.data.message || (success ? "Password reset email sent successfully!" : "Form submission failed."),
            type: success ? "success" : "error",
          });

          setErrors({});
          if (success) {
            navigate("/verify-email", { state: { email } });
          }
        })
        .catch((error) => {
          console.error("User does not exist", error);
          setSnackbar({
            isVisible: true,
            message:
              error.response?.message ||
              "User does not exist",
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
    <div className="flex items-center justify-center font-poppins">
      <motion.div className="flex flex-col items-center justify-center p-6 mt-14 bg-white shadow-md rounded-md w-[600px] border-1 border-t-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <Icon mb="20px" width="50px" height="50px" />
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground ">
            Enter your email to reset your password
          </p>
        </div>
        <div className="w-full mt-4 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mt-4">
              <input
                id="email"
                className={`mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Button label="Reset Password" width="50%" />
            </div>
          </form>
        </div>
      </motion.div>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}
