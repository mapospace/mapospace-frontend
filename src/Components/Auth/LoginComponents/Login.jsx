import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import Button from "../../Common/button";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }
  return (
    <div className="flex items-center justify-center mt-5 ">
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        {/* <MapIcon className="w-12 h-12 text-blue-600" /> */}
        <h1 className="text-2xl font-bold">Welcome to Mapospace</h1>
        <p className="text-muted-foreground">
          Unlock the power of location data for your business
        </p>
      </div>
      <div className="w-full max-w-md mt-8 space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-start font-medium text-gray-700 ">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 relative">
          <label
            htmlFor="password"
            className="block text-sm text-start font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10 rounded"
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
          <Link href="#" className="text-sm text-blue-600" prefetch={false}>
            Forgot your password?
          </Link>
        </div>
        <Button label="Login" />
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            {/* <Link href="#" className="text-blue-600" prefetch={false}>
              Sign up
            </Link> */}
             <Link to="/signup" className="text-blue-600" prefetch={false}> Sign up</Link>
          </p>
          <p className="text-sm mt-2">
            By signing in, you agree to our{" "}
            <Link href="" className="text-blue-600" prefetch={false}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600" prefetch={false}>
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
        <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 py-2 px-4 rounded">
          <ChromeIcon className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
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

function MapIcon(props) {
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
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}
