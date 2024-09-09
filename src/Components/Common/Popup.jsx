import React from 'react';

export default function Modal({ title, children, onSave, onClose, saveButtonText = 'Save', cancelButtonText = 'Cancel' }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">
          {children} {/* Pass content dynamically */}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold focus:outline-none"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold focus:outline-none"
          >
            {saveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
