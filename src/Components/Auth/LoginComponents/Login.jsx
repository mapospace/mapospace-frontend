import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Component() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex flex-col items-center space-y-4">
                <MapIcon className="w-12 h-12 text-blue-600" />
                <h1 className="text-2xl font-bold">Welcome to Mapospace</h1>
                <p className="text-muted-foreground">Unlock the power of location data for your business</p>
            </div>
            <div className="w-full max-w-md mt-8 space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className={`${!email ? "text-red-500" : ""}`}>
                        Email address
                    </label>
                    <input
                        id="email"
                        placeholder="Email address"
                        className={`${!email ? "border-red-500" : ""}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2 relative">
                    <label htmlFor="password" className={`${!password ? "text-red-500" : ""}`}>
                        Password
                    </label>
                    <input
                        id="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className={`${!password ? "border-red-500" : ""}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <EyeIcon
                        className="absolute right-3 top-9 w-5 h-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <checkbox id="remember" />
                        <label htmlFor="remember" className="text-sm font-medium leading-none">
                            Remember me
                        </label>
                    </div>
                    <Link href="#" className="text-sm text-blue-600" prefetch={false}>
                        Forgot your password?
                    </Link>
                </div>
                <button className="w-full bg-blue-600 text-white">Sign up</button>
                <div className="text-center">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <Link href="#" className="text-blue-600" prefetch={false}>
                            Sign up
                        </Link>
                    </p>
                    <p className="text-sm mt-2">
                        By signing in, you agree to our{" "}
                        <Link href="#" className="text-blue-600" prefetch={false}>
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
                        <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <button variant="outline" className="w-full">
                    <ChromeIcon className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button>
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
    )
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
    )
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
    )
}