
import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded w-full"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
