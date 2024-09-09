import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import DynamicTable from '../../Common/Table';
import ToggleSwitch from '../../Common/Toggleswitch';
import AddUser from './AddUser';
import api from "../../Common/interceptor";
import Modal from '../../Common/Popup';  
import Snackbar from "../../Common/snackbar";
import LoadingBar from 'react-top-loading-bar';

export default function UserList() {
  const columns = ['First Name', 'Last Name', 'Verified', 'Root User', 'Active', 'Email'];
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(3); 
  const [showForm, setShowForm] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const loadingBarRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, rowsPerPage]);

  const fetchUsers = async () => {
    loadingBarRef.current.continuousStart();
    try {
      const response = await api.get(`/user-mgmt/users`, {
        params: { page: currentPage, limit: 10 },
      });
      
      const { docs, totalPages } = response.data.data;
      const formattedRows = docs.map(user => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        verified: user.verified,
        rootUser: user.rootUser,
        active: user.active,
        email: user.email
      }));
      setRows(formattedRows);
      setTotalPages(totalPages);
     
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setSnackbar({
        isVisible: true,
        message: "Failed to fetch users.",
        type: "error",
      });
    } finally {
      loadingBarRef.current.complete();
    }
  };

  const handleToggle = async (rowIndex) => {
    const user = rows[rowIndex];
    const newActiveStatus = !user.active;
    const originalStatus = user.active;
    
   
    const updatedRows = [...rows];
    updatedRows[rowIndex].active = newActiveStatus;
    setRows(updatedRows);

    loadingBarRef.current.continuousStart();
    try {
      await api.post('/user-mgmt/toggle-active-status', {
        userId: user.id,
      });
      setSnackbar({
        isVisible: true,
        message: `User ${user.firstName} ${user.lastName} active status updated!`,
        type: "success",
      });
    } catch (error) {
      console.error('Failed to toggle active status:', error);
      updatedRows[rowIndex].active = originalStatus;
      setRows(updatedRows);
      setSnackbar({
        isVisible: true,
        message: `Failed to update active status for ${user.firstName} ${user.lastName}.`,
        type: "error",
      });
    } finally {
      loadingBarRef.current.complete();
    }
  };

  const handleSaveUser = async (newUser) => {
    loadingBarRef.current.continuousStart();
    try {
      const response = await api.post('/user-mgmt/add-user', newUser);
      const savedUser = response.data.data;
      const newUserData = {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        verified: false,
        rootUser: false,
        active: false,
        email: savedUser.email,
      };
      setRows([...rows, newUserData]);
      setShowForm(false);
      setSnackbar({
        isVisible: true,
        message: "User added successfully!",
        type: "success",
      });
    } catch (error) {
      console.error('Failed to add user:', error);
      setSnackbar({
        isVisible: true,
        message: "Failed to add user.",
        type: "error",
      });
    } finally {
      loadingBarRef.current.complete();
    }
  };

  const handleResetPassword = (row, rowIndex) => {
    setSelectedUser(rows[rowIndex]);
    setShowPasswordResetModal(true);
  };

  const handleSavePassword = async () => {
    loadingBarRef.current.continuousStart();
    try {
      await api.post('/user-mgmt/reset-password', {
        userId: selectedUser.id,
        newPassword,
      });
      setSnackbar({
        isVisible: true,
        message: `Password reset for ${selectedUser.firstName} ${selectedUser.lastName} was successful.`,
        type: "success",
      });
      setShowPasswordResetModal(false);
      setNewPassword('');
    } catch (error) {
      console.error('Failed to reset password:', error);
      setSnackbar({
        isVisible: true,
        message: `Failed to reset password for ${selectedUser.firstName} ${selectedUser.lastName}.`,
        type: "error",
      });
    } finally {
      loadingBarRef.current.complete();
    }
  };

  const handleAddUser = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const tableRows = rows.map((row, rowIndex) => [
    row.firstName,
    row.lastName,
    row.verified ? '✔️' : '❌',
    row.rootUser ? '✔️' : '❌',
    <ToggleSwitch
      key={rowIndex}
      initialChecked={row.active}
      onToggle={() => handleToggle(rowIndex)}
    />,
    row.email,
  ]);

  const actions = [
    {
      label: 'Reset Password',
      handler: handleResetPassword,
    }
  ];

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };

  return (
    <div className="p-6">
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      
      {showForm ? (
        <AddUser onSave={handleSaveUser} onCancel={handleCancel} />
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold font-poppins">User Management</h1>
          <button onClick={handleAddUser} className="bg-purple-700 hover:bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded font-poppins">
            Add Users
          </button>
        </div>
      )}

      <DynamicTable rows={tableRows} columns={columns} actions={actions} />

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600 font-poppins">
          Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, rows.length)} of {rows.length} users
        </span>
        {/* <div className="flex items-center space-x-2">
          <label htmlFor="rowsPerPage" className="text-sm text-gray-600 font-poppins">Rows per page:</label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-3 py-2 border rounded-lg text-gray-600 font-poppins"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div> */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg text-white font-semibold transition-colors duration-300 font-poppins ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600 font-poppins">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-white font-semibold transition-colors duration-300 font-poppins ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showPasswordResetModal && (
        <Modal
          title={`Reset Password for ${selectedUser?.firstName} ${selectedUser?.lastName}`}
          onSave={handleSavePassword}
          onClose={() => setShowPasswordResetModal(false)}
        >
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Modal>
      )}

      <Snackbar
        isVisible={snackbar.isVisible}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}
