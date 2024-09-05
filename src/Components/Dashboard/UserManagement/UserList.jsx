
import React from 'react';
import DynamicTable from '../../Common/Table';

export default function Userlist()  {
  const columns = ['Name', 'Age', 'Email'];
  const rows = [
    ['John Doe', '30', 'john@example.com'],
    ['Jane Smith', '25', 'jane@example.com'],
    ['Sam Brown', '35', 'sam@example.com']
  ];

  const actions = [
    {
      label: 'Edit',
      handler: (row, rowIndex) => {
        alert(`Edit row ${rowIndex}: ${row.join(', ')}`);
      }
    },
    {
      label: 'Delete',
      handler: (row, rowIndex) => {
        alert(`Delete row ${rowIndex}: ${row.join(', ')}`);
      }
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dynamic Table with Actions</h1>
      <DynamicTable rows={rows} columns={columns} actions={actions} />
    </div>
  );
};


