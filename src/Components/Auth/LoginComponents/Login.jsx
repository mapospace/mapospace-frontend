import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import Snackbar from "../../Common/snackbar";
import { useAuth } from "../auth";

import { useNavigate } from "react-router-dom";
import Axios from "axios";
import logo from "../../../assets/logo.png";
import { motion } from "framer-motion";
import LoadingBar from 'react-top-loading-bar'
import Button from "../../Common/Button";

export default function Login() {
  const [visible, setVisible] = useState(true);
  const ref = useRef(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (ref.current) {
      ref.current.staticStart(); // Start the loading bar
    }

    if (email && password) {
      const formData = {
        businessEmail: email,
        password: password,
      };

      Axios.post(`${process.env.REACT_APP_BASEURL}/user/login`, formData)
        .then((response) => {
          const token = response.data.data.userLoginToken;
          console.log("Logged in Successfully!", token);

          // Save the token and update authentication state
          sessionStorage.setItem('token', token);
          login(token); // Pass token to login function

          setSnackbar({
            isVisible: true,
            message: "Logged in Successfully!",
            type: "success",
          });

          if (ref.current) {
            ref.current.complete(); // Complete the loading bar
          }

          if (response.data.data.tenantExists) {
            navigate("/mapospace-frontend/dashboard");
          } else {
            navigate("/mapospace-frontend/onboard");
          }
        })
        .catch((error) => {
          if (ref.current) {
            ref.current.complete(); // Complete the loading bar even on error
          }
          setVisible(false);
          console.error("Error submitting form:", error);
          setSnackbar({
            isVisible: true,
            message: "Invalid credentials",
            type: "error",
          });
        });

      setTimeout(() => {
        setVisible(false);
        setSnackbar({ isVisible: false, message: "", type: "" });
      }, 3000);
    } else {
      setVisible(false);
      setSnackbar({
        isVisible: true,
        message: "Please enter both email and password",
        type: "error",
      });
    }
  };


  const { login } = useAuth(); // Access login function from AuthProvider
  const navigate = useNavigate(); // Access navigate function from react-router-dom

  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };

  return (
    <div className="flex items-center justify-center font-poppins ">
      {visible && <LoadingBar color='#7e22ce' height={5} ref={ref} />}
      <motion.div className="flex flex-col items-center justify-center py-3 px-9 bg-white shadow-2xl rounded-md border-1 border-t-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <div className="flex flex-col items-center space-y-2">
          <img src={logo} alt="Logo" className="w-[60px] h-[60px]" />
          <h1 className="text-2xl font-bold">Welcome to Mapospace</h1>
          <p className="text-muted-foreground">
            Unlock the power of location data for your business
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-md mt-4 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-base text-start font-medium text-black-700 "
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-1.5 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <label
                htmlFor="password"
                className="block text-base text-start font-medium text-black-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="block w-full px-3 py-1.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-4 text-blue-600"
                    checked={checked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 text-gray-700">Remember Me</span>
                </label>
              </div>
              <a
                href="/mapospace-frontend/forgotpassword"
                className="text-sm text-blue-600 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Forgot your password?
              </a>
            </div>
            <Button label="Login" />

            <div className="text-center">
              <p className="text-sm">
                Don't have an account?
                <Link to="/mapospace-frontend/signup" className="text-blue-600 font-semibold px-1" prefetch={false}>
                  Sign up
                </Link>
              </p>
              <p className="text-sm mt-2">
                By signing in,you agree to our
                <Link to="" className="text-blue-600 font-semibold px-1" prefetch={false}>
                  Terms of Service
                </Link>
                and
                <Link to="#" className="text-blue-600 font-semibold pl-1" prefetch={false}>
                  Privacy Policy
                </Link>
              </p>
            </div>
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
          </div>
        </form>
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          isVisible={snackbar.isVisible}
          onClose={handleCloseSnackbar}
        />
        <div className="w-full max-w-md mt-2 mb-2 space-y-4">
          <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 bg-transparent hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-200 py-2 px-4 rounded transition-colors">
            <ChromeIcon className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>
      </motion.div >
    </div >
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

function EyeIcon(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
