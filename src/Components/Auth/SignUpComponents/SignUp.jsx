import React, { useState } from "react";
import Button from "../../Common/Button";
import { validateForm } from "../../Common/validator";
import Snackbar from "../../Common/snackbar";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignUp() {
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

  const handleTogglePassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleSubmit = (event) => {
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

      axios.post(`${process.env.REACT_APP_BASEURL}/user/signup`, formData)
        .then((response) => {
          console.log("Form submitted successfully!", response.data);
          setSnackbar({
            isVisible: true,
            message: "Form submitted successfully!",
            type: "success",
          });
          setErrors({});
        })
        .catch((error) => {
          console.error("Error submitting form:", error);

          if (error.response) {
            // Extract the error message from the response
            const errorMessage = error.response.data.message || "Error submitting form. Please try again later.";

            setSnackbar({
              isVisible: true,
              message: errorMessage,
              type: "error",
            });
          } else {
            // Handle cases where there is no response from the server (e.g., network error)
            setSnackbar({
              isVisible: true,
              message: "Network error. Please check your connection and try again.",
              type: "error",
            });
          }
        });
    } else {
      // setSnackbar({
      //   isVisible: true,
      //   message: "Please fix the errors in the form.",
      //   type: "error",
      // });
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
      <motion.div className="flex flex-col items-center justify-center px-6 pt-2 pb-4 border-1 border-t-2 bg-white shadow-xl rounded-md" style={{ width: '550px' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <div className="flex flex-col items-center space-y-4 " >
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
                Confirm password
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
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 bg-transparent hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-200 py-2 px-4 rounded transition-colors">
            <ChromeIcon className="w-5 h-5 mr-2" />
            Sign up with google
          </button>
          <div className="flex justify-center align-middle">

            <h1 className="text-sm ">Already have a account ?
              <span>
                <Link to="/" className="text-blue-600 font-semibold" prefetch={false}>
                  {" "}
                  Login
                </Link>
              </span></h1>
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

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
