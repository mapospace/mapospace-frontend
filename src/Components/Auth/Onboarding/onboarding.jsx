import React, { useState } from "react";
import Button from "../../Common/button";
import Snackbar from "../../Common/snackbar";
import logo from "../../../assets/logo.png"; 

export default function onboard() {
  const [compamyname, setcompamyname] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [phone, setphone] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");

  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };

  return (
    <div className="flex items-center justify-center font-poppins mt-3">
      <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-md" style={{ width: '510px' }}>
        <div className="flex flex-col items-center space-y-4">
          {/* <img src={logo} alt="Logo" className="w-[60px] h-[60px]" /> */}
          <h1 className="text-2xl font-bold">Welcome to Mapospace</h1>
          <p className="text-muted-foreground">
            Please provide your company information to get started
          </p>
        </div>
        <div className="w-full max-w-md mt-8 space-y-4">
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="Company name" className="block text-sm font-medium text-black-700">
                  Company name
                </label>
                <input
                  id="Company name"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={compamyname}
                  onChange={(e) => setcompamyname(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Contact email" className="block text-sm font-medium text-black-700">
                  Contact email
                </label>
                <input
                  id="Contact email"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 mt-4">
                <label htmlFor="street" className="block text-sm font-medium text-black-700">
                  Street
                </label>
                <input
                  id="street"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={street}
                  onChange={(e) => setstreet(e.target.value)}
                />
              </div>
              <div className="space-y-2 mt-4">
                <label htmlFor="city" className="block text-sm font-medium text-black-700">
                  City
                </label>
                <input
                  id="city"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>
              </div>
              <div className="space-y-2 mt-4">
                <label htmlFor="phone" className="block text-sm font-medium text-black-700">
                  Contact phone
                </label>
                <input
                  id="phone"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 mt-4">
                <label htmlFor="State" className="block text-sm font-medium text-black-700">
                  State
                </label>
                <input
                  id="State"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />
              </div>
              <div className="space-y-2 mt-4">
                <label htmlFor="Zip code" className="block text-sm font-medium text-black-700">
                  Zip code
                </label>
                <input
                  id="Zip code"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={zip}
                  onChange={(e) => setzip(e.target.value)}
                />
              </div>
              <div className="space-y-2 mt-4">
                <label htmlFor="Country" className="block text-sm font-medium text-black-700">
                  Country
                </label>
                <select
                  id="Country"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="" disabled>Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              </div>
              <div className="space-y-2 mt-4">
                <label htmlFor="Industry" className="block text-sm font-medium text-black-700">
                  Industry
                </label>
                <select
                  id="Industry"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="" disabled>Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  {/* Add more industries as needed */}
                </select>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button label="Submit" />
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}
