import React, { useState, useEffect } from "react";

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
    <div className="flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center max-w-md w-full mt-[4%]">
        <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
        <p className="mb-4">
          <span className="block font-semibold">
            We've sent a verification email to example@email.com
          </span>
          <span>
            Please check your inbox and click the link to verify your account.
          </span>
        </p>
        <button
          className="bg-[#8499FE] text-white px-12 py-2 disabled:opacity-50" 
          onClick={handleResend}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend"}
        </button>
      </div>
    </div>
  );
}
