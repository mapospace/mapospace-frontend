import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserIcon,
  UserGroupIcon,
  ServerIcon,
  KeyIcon,
  LockClosedIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  UserIcon: <UserIcon className="h-5 w-5" />,
  UserGroupIcon: <UserGroupIcon className="h-5 w-5" />,
  ServerIcon: <ServerIcon className="h-5 w-5" />,
  KeyIcon: <KeyIcon className="h-5 w-5" />,
  LockClosedIcon: <LockClosedIcon className="h-5 w-5" />,
};

export default function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isActive = location.pathname === item.path;

  return (
    <li className="mb-2">
      {item.subItems ? (
        <div>
          <button
            onClick={handleToggle}
            className={`flex items-center w-full text-left space-x-2 p-2 rounded-md  font-poppins ${
              isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
            }`}
          >
            <span className="flex items-center space-x-2">
              {iconMap[item.icon]}
              <span className="font-medium font-poppins">{item.title}</span>
            </span>
            {isOpen ? (
              <ChevronDownIcon className="h-5 w-5 ml-auto transition-transform" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 ml-auto transition-transform" />
            )}
          </button>
          <ul
            className={`pl-6 mt-2 space-y-1 transition-all duration-300 ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {item.subItems.map((subItem, index) => (
              <li key={index} className="flex items-center space-x-2 font-poppins">
                <MinusIcon className="h-4 w-4 text-gray-500" />
                <MenuItem item={subItem} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          to={item.path}
          className={`flex items-center space-x-2 p-2 rounded-md ${
            isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
          }`}
        >
          {iconMap[item.icon]}
          <span className="font-medium">{item.title}</span>
        </Link>
      )}
    </li>
  );
}
