import React, { useState } from 'react';

export default function DynamicTable({ columns, rows, actions, rowsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Determine the rows to display on the current page
  const currentRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="border-b">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium font-poppins text-gray-500 uppercase tracking-wider">
                  {column}
                </th>
              ))}
              {/* Actions column header */}
              <th className="px-6 py-3 text-left text-xs font-medium font-poppins text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="relative hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-poppins">
                    {cell}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium font-poppins flex space-x-2">
                  {/* Dynamically render action buttons */}
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.handler(row, rowIndex)} // Handle dynamic action
                      className={`flex items-center justify-center px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 ${
                        action.label === 'Delete' ? 'text-red-600' : 'text-blue-600'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination logic (if needed) */}
    
    </div>
  );
}
