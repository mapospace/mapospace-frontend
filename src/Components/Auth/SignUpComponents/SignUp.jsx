import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Common/button";


export default function Component() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [Password, setPassword] = useState("");
    return (
      <div className="flex items-center justify-center mt-5">
      <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
        </div>
        
        <div className="w-full max-w-md mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input 
                id="first-name" 
                placeholder="" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
                value={fname}
                onChange={(e) => setfname(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input 
                id="last-name" 
                placeholder="" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
                value={lname}
                onChange={(e) => setlname(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
            <input 
              id="email" 
              placeholder="" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
    
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter,
              one number, and one special character.
            </div>
          </div>
    
          <div className="flex justify-center mt-4">
            {/* <button 
              type="submit" 
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button> */}
              <Button label="Sign up" />
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
    
    )
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