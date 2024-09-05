import React, { useState, useEffect, useRef } from 'react';

export default function Topbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to the dropdown container

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {

    console.log('Logging out...');
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

   
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white p-4 fixed top-0 left-0 right-0 z-20 flex items-center shadow justify-between">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white mr-4"
      >
        {/* Hamburger Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" className="text-navy" /> {/* Apply color */}
        </svg>
      </button>
      <h1 className="text-xl">App Header</h1>

      {/* User Profile Icon and Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={handleDropdownToggle} 
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white rounded-full ml-auto flex items-center"
        >
          {/* User Profile Icon */}
          <img 
            src="https://via.placeholder.com/40" 
            alt="User Profile" 
            className="w-10 h-10 rounded-full" 
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-30 transition-all duration-300 ease-in-out transform ${
            isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
