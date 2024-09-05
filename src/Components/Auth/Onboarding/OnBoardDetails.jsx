import React, { useState } from "react";
import Button from "../../Common/Button";
import Snackbar from "../../Common/snackbar";
import Icon from "../../Common/Icon";
import Axios from "axios";
export default function OnBoardDetails() {
  const [compamyname, setcompamyname] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [phone, setphone] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const industries = [
    "Agriculture",
    "Real Estate",
    "Urban Planning",
    "Transportation and Logistics",
    "Retail",
    "Telecommunications",
    "Environmental Monitoring",
    "Energy and Utilities",
    "Mining",
    "Healthcare",
    "Disaster Management",
    "Insurance",
    "Government and Public Sector",
    "Tourism and Hospitality",
    "Forestry",
    "Oil and Gas",
    "Supply Chain Management",
    "Construction",
    "Defense and Security",
    "Water Resource Management",
  ];

  const countries = [
    "USA",
    "Canada",
    "India",

  ];

  const validateCompanyName = (name) => {
    if (!name) return "Company name is required";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    if (email.endsWith("@gmail.com")) return "Gmail addresses are not allowed for business emails";
    return "";
  };

  const validateStreet = (street) => {
    if (!street) return "Street is required";
    return "";
  };

  const validateCity = (city) => {
    if (!city) return "City is required";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Simple validation for 10-digit phone numbers
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Invalid phone number";
    return "";
  };

  const validateState = (state) => {
    if (!state) return "State is required";
    return "";
  };

  const validateZip = (zip) => {
    if (!zip) return "Zip code is required";
    return "";
  };

  const validateCountry = (country) => {
    if (!country) return "Country is required";
    return "";
  };

  const validateIndustry = (industry) => {
    if (!industry) return "Industry is required";
    return "";
  };



  const handleInputChange = (e, validator, setState) => {
    const { id, value } = e.target;
    setState(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validator(value),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      "Company name": validateCompanyName(compamyname),
      "Contact email": validateEmail(email),
      street: validateStreet(street),
      city: validateCity(city),
      phone: validatePhone(phone),
      state: validateState(state),
      zip: validateZip(zip),
      country: validateCountry(country),
      industry: validateIndustry(industry),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      const emailDomain = email.substring(email.lastIndexOf("@") + 1);

      const formData = {
        "companyName": compamyname,
        "address": {
          "street": email,
          "city": city,
          "state": state,
          "zipCode": zip,
          "country": country
        },
        "contactEmail": email,
        "contactPhone": phone,
        "industry": industry,
        "businessEmailDomain": emailDomain
      };


      Axios.post(`${process.env.REACT_APP_BASEURL}/tenant/onboard-tenant`, formData)
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
          setSnackbar({
            isVisible: true,
            message: "Error submitting form. Please try again later.",
            type: "error",
          });
        });
    } else {
      setSnackbar({
        isVisible: true,
        message: "Please fix the errors before submitting",
        type: "error",
      });
    }
    setTimeout(() => {
      setSnackbar({ isVisible: false, message: "", type: "" });
    }, 3000);
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };

  return (
    <div className="flex items-center justify-center font-poppins mt-3">
      <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-md w-[610px] border-1 border-t-2">
        <Icon mb="20px" width="50px" height="50px" />
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">Welcome to Mapospace</h1>
          <p className="text-muted-foreground">
            Please provide your company information to get started
          </p>
        </div>
        <div className="w-full max-w-xl mt-8 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="Company name" className="block text-sm font-medium text-black-700">
                  Company name
                </label>
                <input
                  id="Company name"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={compamyname}
                  onChange={(e) => handleInputChange(e, validateCompanyName, setcompamyname)}
                />
                {errors['Company name'] && (
                  <p className="text-red-500 text-xs">{errors['Company name']}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="Contact email" className="block text-sm font-medium text-black-700">
                  Contact email
                </label>
                <input
                  id="Contact email"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={email}
                  onChange={(e) => handleInputChange(e, validateEmail, setemail)}
                />
                {errors['Contact email'] && (
                  <p className="text-red-500 text-xs">{errors['Contact email']}</p>
                )}
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
                    onChange={(e) => handleInputChange(e, validateStreet, setstreet)}
                  />
                  {errors['street'] && (
                    <p className="text-red-500 text-xs">{errors['street']}</p>
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  <label htmlFor="city" className="block text-sm font-medium text-black-700">
                    City
                  </label>
                  <input
                    id="city"
                    className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                    value={city}
                    onChange={(e) => handleInputChange(e, validateCity, setcity)}
                  />
                  {errors['city'] && (
                    <p className="text-red-500 text-xs">{errors['city']}</p>
                  )}
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
                  onChange={(e) => handleInputChange(e, validatePhone, setphone)}
                />
                {errors['phone'] && (
                  <p className="text-red-500 text-xs">{errors['phone']}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 mt-4">
                  <label htmlFor="State" className="block text-sm font-medium text-black-700">
                    State
                  </label>
                  <input
                    id="state"
                    className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                    value={state}
                    onChange={(e) => handleInputChange(e, validateState, setstate)}
                  />
                  {errors['state'] && (
                    <p className="text-red-500 text-xs">{errors['state']}</p>
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  <label htmlFor="zip" className="block text-sm font-medium text-black-700">
                    Zip code
                  </label>
                  <input
                    id="zip"
                    className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                    value={zip}
                    onChange={(e) => handleInputChange(e, validateZip, setzip)}
                  />
                  {errors['zip'] && (
                    <p className="text-red-500 text-xs">{errors['zip']}</p>
                  )}
                </div>
                <div className="space-y-2 mt-4">
                  <label htmlFor="country" className="block text-sm font-medium text-black-700">
                    Country
                  </label>
                  <select
                    id="country"
                    className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                    value={country}
                    onChange={(e) => handleInputChange(e, validateCountry, setCountry)}
                  >
                    <option value="" disabled>Select Country</option>
                    {countries.map((c, index) => (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors['country'] && (
                    <p className="text-red-500 text-xs">{errors['country']}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <label htmlFor="industry" className="block text-sm font-medium text-black-700">
                  Industry
                </label>
                <select
                  id="industry"
                  className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  value={industry}
                  onChange={(e) => handleInputChange(e, validateIndustry, setIndustry)}
                >
                  <option value="" disabled>Select Industry</option>
                  {industries.map((ind, index) => (
                    <option key={index} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                {errors['industry'] && (
                  <p className="text-red-500 text-xs">{errors['industry']}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button label="Submit" />
            </div>
          </form>
        </div>
        {snackbar.isVisible && (
          <>

            <Snackbar
              type={snackbar.type}
              message={snackbar.message}
              onClose={handleCloseSnackbar}
            />
          </>
        )}
      </div>
    </div>
  );
}
