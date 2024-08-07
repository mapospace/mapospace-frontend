import React, { useState, useEffect } from "react";
import "./VerifyEmail.css";

export default function VerifyEmail({ email }) {
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleResend = () => {
    // Logic to resend the email
    setTimer(180); // Reset the timer to 3 minutes
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold main-text">Verify your email</h1>
        <p className="sub-text">
          <span className="sub-text-1">
            We've sent a verification email to example@email.com.
          </span>
          <span className="sub-text-2">
            Please check your inbox and click the link to verify your account.
          </span>
        </p>
        <button
          className="text-white p-2 mt-4 resend-button"
          onClick={handleResend}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend"}
        </button>
      </div>
    </div>
  );
}
