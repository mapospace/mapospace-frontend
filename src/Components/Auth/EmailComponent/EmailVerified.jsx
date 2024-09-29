import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../Common/Icon";
import Axios from "axios";

const EmailVerified = () => {
    const navigate = useNavigate();
    const { id: token } = useParams(); // Extract the 'id' (token) from the URL

    // Automatically redirect after 2 minutes
    useEffect(() => {

        if (token) {
            // Send token via POST request
            const baseUrl = process.env.REACT_APP_BASEURL || 'https://develop-dot-mapospacev1.el.r.appspot.com/api/v1';
            Axios.post(`${baseUrl}/user/verify-token`, { token })
                .then((response) => {
                    console.log("Token sent successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error sending token:", error);
                });
        } else {
            console.error("No token found in URL");
        }

        const timer = setTimeout(() => {
            navigate("/mapospace-frontend/login"); // Redirect to the login page after 2 minutes
        }, 2000); // 2 minutes in milliseconds

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [navigate, token]);

    // Manual button click to navigate to login immediately
    const handleContinue = () => {
        navigate("/mapospace-frontend/login");
    };

    return (
        <div className="flex items-center justify-center mt-5 font-poppins mt-12">
            <div className="flex flex-col items-center justify-center p-6 bg-red shadow-md rounded-md border-1 border-t-2">
                <Icon mb="20px" width="50px" height="50px" />
                <div className="flex flex-col items-center space-y-1 mb-4">
                    <h1 className="text-2xl font-bold mb-4">Your email verified successfully</h1>
                    <p className="text-muted-foreground m-0 text-md">
                        Your email has been verified successfully.
                    </p>
                    <p className="text-muted-foreground m-0 text-md">
                        Now, please continue with the login.
                    </p>
                </div>

                <button
                    className="bg-purple-700 hover:bg-purple-500 text-white py-2 px-4 rounded-md w-52"
                    onClick={handleContinue} // Call the navigation function when button is clicked
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default EmailVerified;
