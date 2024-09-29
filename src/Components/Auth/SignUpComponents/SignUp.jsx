import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "../../Common/Button";
import { validateForm } from "../../Common/validator";
import Snackbar from "../../Common/snackbar";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import LoadingBar from 'react-top-loading-bar';

export default function SignUp() {
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleTogglePassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleSubmit = (event) => {
    ref.current.staticStart();
    event.preventDefault();

    const newErrors = validateForm(
      fname,
      lname,
      email,
      password,
      passwordAgain
    );

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        firstName: fname,
        lastName: lname,
        businessEmail: email,
        password: password,
        passwordAgain: passwordAgain,
      };
      const baseUrl = process.env.REACT_APP_BASEURL || 'https://develop-dot-mapospacev1.el.r.appspot.com/api/v1';
      axios.post(`${baseUrl}/user/signup`, formData)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
          setSnackbar({
            isVisible: true,
            message: "Form submitted successfully!",
            type: "success",
          });
          setErrors({});

          // Navigate to the VerifyEmail page with email in state
          navigate("/mapospace-frontend/verify-email", { state: { email } });

        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          setVisible(false);
          if (error.response) {
            const errorMessage = error.response.data.message || "Error submitting form. Please try again later.";
            setSnackbar({
              isVisible: true,
              message: errorMessage,
              type: "error",
            });
          } else {
            setSnackbar({
              isVisible: true,
              message: "Network error. Please check your connection and try again.",
              type: "error",
            });
          }
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
    <div className="flex h-full items-center justify-center font-poppins mt-1">
      {visible && <LoadingBar color='#7e22ce' height={5} ref={ref} />}
      <motion.div className="flex flex-col items-center justify-center px-6 pt-2 pb-4 border-1 border-t-2 bg-white shadow-xl rounded-md" style={{ width: '550px' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="Logo" className="w-[60px] h-[60px]" />
          <h1 className="text-xl font-bold">Create Your Account</h1>
        </div>
        <div className="w-full max-w-lg mt-4 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-black-700"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  className={`mt-1 block w-full px-3 py-1 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.fname ? "border-red-500" : "border-gray-300"
                    }`}
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                {errors.fname && (
                  <p className="text-red-500 text-xs mt-1">{errors.fname}</p>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-black-700"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  className={`mt-1 block w-full px-3 py-1 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.lname ? "border-red-500" : "border-gray-300"
                    }`}
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
                {errors.lname && (
                  <p className="text-red-500 text-xs mt-1">{errors.lname}</p>
                )}
              </div>
            </div>
            <div className="space-y-1 mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black-700"
              >
                Business Email
              </label>
              <input
                id="email"
                className={`mt-1 block w-full px-3 py-1 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-1 mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`mt-1 block w-full px-3 py-1 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="space-y-1 mt-4">
              <label
                htmlFor="passwordAgain"
                className="block text-sm font-medium text-black-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="passwordAgain"
                  type={confirmPassword ? "text" : "password"}
                  className={`mt-1 block w-full px-3 py-1 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.passwordAgain ? "border-red-500" : "border-gray-300"
                    }`}
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
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
            <div className="flex justify-center mt-4">
              <Button label="Sign up" />
            </div>
          </form>
          <div className="flex justify-center items-center mt-1">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/mapospace-frontend" className="text-purple-700 font-bold">
                Login
              </Link>
            </p>
          </div>
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
