import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Snackbar from "../../Common/snackbar";
import Axios from "axios";
export default function VerifyEmail() {
  const [timer, setTimer] = useState(180);
  const location = useLocation();
  const { email } = location.state || { email: "example@email.com" }; 
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
//  const newErrors = validateForm(email);

    if (email) {
      const formData = {
        businessEmail: email,
      };

      Axios.post(`${process.env.REACT_APP_BASEURL}/user/resend-verification-mail`, formData)
        .then((response) => {
          const { message, success } = response.data;
          setTimer(180); 
          setSnackbar({
            isVisible: true,
            message: message || (success ? "Password reset email sent successfully!" : "Form submission failed."),
            type: success ? "success" : "error",
          });
        
        //   setErrors({});
        })
        .catch((error) => {
          console.error("Please wait before requesting another email", error);
          setSnackbar({
            isVisible: true,
            message:
              error.response?.message ||
              "Please wait before requesting another email",
            type: "error",
          });
        });
    } else {
    //   setErrors(newErrors);
    }

    setTimeout(() => {
      setSnackbar({ isVisible: false, message: "", type: "" });
    }, 3000);
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex items-center justify-center mt-5 font-poppins ">
      <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center space-y-4 mb-4">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground">
            We've sent a verification email to <b>{email}</b>.<br /> Please check your inbox and click the link to verify your account.
          </p>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleSubmit}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend"}
        </button>
        <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={handleCloseSnackbar}
      />
      </div>
    </div>
  );
}
