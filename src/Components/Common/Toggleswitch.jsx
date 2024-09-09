import React, { useState } from 'react';

const ToggleSwitch = ({ initialChecked, onToggle }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = async () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle(newChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
        />
        <div
          className={`block w-12 h-6 rounded-full ${
            checked ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        ></div> {/* Set background color for active/inactive states */}
        <div
          className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition ${
            checked ? 'transform translate-x-6 bg-white' : 'bg-white'
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
