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
} from '@heroicons/react/24/outline'; 
const iconMap = {
  UserIcon: <UserIcon className="h-5 w-5" />,
  UserGroupIcon: <UserGroupIcon className="h-5 w-5" />,
  ServerIcon: <ServerIcon className="h-5 w-5" />,
  KeyIcon: <KeyIcon className="h-5 w-5" />,
  LockClosedIcon: <LockClosedIcon className="h-5 w-5" />,
};

export default function MenuItem ({ item })  {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

 
  const isActive = location.pathname === item.path;

  return (
    <li>
      {item.subItems ? (
        <div>
          <button
            onClick={handleToggle}
            className={`flex items-center w-full text-left space-x-2 ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600`}
          >
            <span className="flex items-center space-x-2">
              {iconMap[item.icon]}
              <span>{item.title}</span>
            </span>
            {isOpen ? (
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 ml-auto" />
            )}
          </button>
          {isOpen && (
            <ul className="pl-4">
              {item.subItems.map((subItem, index) => (
                <MenuItem key={index} item={subItem} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link
          to={item.path}
          className={`flex items-center space-x-2 ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600`}
        >
          {iconMap[item.icon]}
          <span>{item.title}</span>
        </Link>
      )}
    </li>
  );
};


