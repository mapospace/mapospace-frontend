
import React from 'react';

const Button = ({ label, onClick, width = "100%" }) => {
  return (
    <button
      type="submit"
      className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded w-full"
      onClick={onClick}
      style={{ width }}
    >
      {label}
    </button>
  );
};

export default Button;
