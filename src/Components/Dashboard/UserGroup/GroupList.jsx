import React, { useState, useEffect, useRef } from 'react';
import DynamicTable from '../../Common/Table';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import api from "../../Common/interceptor";
import Snackbar from "../../Common/snackbar";
import ToggleSwitch from '../../Common/Toggleswitch';
import LoadingBar from 'react-top-loading-bar'; 
import { Link } from "react-router-dom";

export default function GroupList() {
    const columns = ['Group Name', 'Group Admin', 'Users Count', 'Active'];
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [totalGroups, setTotalGroups] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(8); 
    const [snackbar, setSnackbar] = useState({
      isVisible: false,
      message: "",
      type: "",
    });
    const loadingBarRef = useRef(null);

    useEffect(() => {
        fetchGroups();
    }, [currentPage, rowsPerPage]);

    const fetchGroups = async () => {
        if (loadingBarRef.current) {
            loadingBarRef.current.continuousStart(); 
        }
        try {
            const response = await api.get(`/user-group/list`);

            const { data, totalDocs, totalPages, page } = response.data;

            const formattedRows = data.map(group => ({
                id: group._id,
                name: group.name,
                groupAdmin: group.groupAdmin.firstName + " " + group.groupAdmin.lastName,
                usersCount: group.users.length,
                active: group.active,
            }));
            
            setRows(formattedRows);
            setTotalPages(Math.ceil(totalDocs / rowsPerPage)); // Calculate total pages
            setTotalGroups(totalDocs); // Set total number of groups
        

        } catch (error) {
            console.error('Failed to fetch groups:', error);
            setSnackbar({
                isVisible: true,
                message: "Failed to fetch groups.",
                type: "error",
            });
        } finally {
            if (loadingBarRef.current) {
                loadingBarRef.current.complete(); 
            }
        }
    };

    const handleToggle = async (rowIndex) => {
        const updatedRows = [...rows];
        const group = updatedRows[rowIndex];
        const originalStatus = group.active;
    
        // Toggle the status locally
        updatedRows[rowIndex].active = !group.active;
        setRows(updatedRows);
    
        if (loadingBarRef.current) {
            loadingBarRef.current.continuousStart(); 
        }
        try {
            await api.get(`/user-group/${group._id}`); 
            setSnackbar({
                isVisible: true,
                message: `Group ${group.name} status updated!`,
                type: "success",
            });
        } catch (error) {
            console.error('Failed to toggle active status:', error);
            
            updatedRows[rowIndex].active = originalStatus;
            setRows(updatedRows);
            setSnackbar({
                isVisible: true,
                message: `Failed to update status for ${group.name}.`,
                type: "error",
            });
        } finally {
            if (loadingBarRef.current) {
                loadingBarRef.current.complete(); 
            }
        }
    };

    const tableRows = rows.map((row, rowIndex) => [
        row.name,
        row.groupAdmin,
        row.usersCount,
        <ToggleSwitch
          key={row.id}
          initialChecked={row.active}
          onToggle={() => handleToggle(rowIndex)}
        />,
    ]);

    const actions = [
        {
          label: 'View Details',
          handler: (rowIndex) => {
            console.log('View details for:', rowIndex.id);
          }
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
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ isVisible: false, message: "", type: "" });
    };

    return (
        <>
         <div className="p-6">
        <LoadingBar ref={loadingBarRef} /> 
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold font-poppins">User Group</h1>
          <Link to="/mapospace-frontend/add-Group"><button  className="bg-purple-700 hover:bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded font-poppins">
            Add Group
          </button></Link>
        </div>
        <DynamicTable rows={tableRows} columns={columns} actions={actions} />
        {/* <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600 font-poppins">
                Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalGroups)} of {totalGroups} groups
            </span>
            <div className="flex items-center space-x-2">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-white font-semibold transition-colors duration-300 font-poppins ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-600 font-poppins">
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg text-white font-semibold transition-colors duration-300 font-poppins ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div> */}
        {/* <div className="mt-4">
            <label className="text-sm font-poppins">Rows per page:</label>
            <select 
                className="ml-2 border rounded-lg p-1 font-poppins"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
            >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div> */}
        {snackbar.isVisible && (
            <Snackbar
              message={snackbar.message}
              type={snackbar.type}
              onClose={handleCloseSnackbar}
            />
        )}
        </div>
        </>
    );
}
