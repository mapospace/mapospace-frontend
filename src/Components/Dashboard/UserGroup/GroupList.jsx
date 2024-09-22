import React, { useState, useEffect, useRef } from 'react';
import DynamicTable from '../../Common/Table';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import api from "../../Common/interceptor";
import Snackbar from "../../Common/snackbar";
import ToggleSwitch from '../../Common/Toggleswitch';
import LoadingBar from 'react-top-loading-bar';
import { Link } from "react-router-dom";
import GroupDetails from './GroupDetails';
import { useDispatch } from 'react-redux';
import { setGroupData, toggleVisibility } from '../../../Store/Slices/GroupDetailsSlice';

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

            console.log("------------------", response)
            const formattedRows = data.map(group => ({
                id: group._id,
                name: group.name,
                groupAdmin: group.groupAdmin == null ? "null" : group.groupAdmin.firstName + " " + group.groupAdmin.lastName,
                usersCount: group.users.length,
                active: group.active,
                detail: group
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
        <GroupButton label='View Details' data={row.detail} />
    ]);

    const actions = [
        {
            label: 'View Details',
            handler: (rowIndex, data) => {
                console.log('View details for:', rowIndex, data);
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
            {/* <GroupDetails /> */}
            <div className="p-6">
                <LoadingBar ref={loadingBarRef} />
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold font-poppins">User Group</h1>
                    <Link to="/mapospace-frontend/add-Group"><button className="bg-purple-700 hover:bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded font-poppins">
                        Add Group
                    </button></Link>
                </div>
                <DynamicTable rows={tableRows} columns={columns} actions={actions} />

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


const GroupButton = ({ label, data }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        // Set the group data (if needed) and toggle the visibility
        dispatch(setGroupData(data)); // Optionally set the group data
        dispatch(toggleVisibility());  // Toggle the visibility of the group details
    };
    return <button
        // key={actionIndex}
        onClick={() => {
            handleClick(data);
        }}
        className={`flex items-center justify-center px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 ${label === 'Delete' ? 'text-red-600' : 'text-blue-600'}`}
    >
        {label}
    </button>
}