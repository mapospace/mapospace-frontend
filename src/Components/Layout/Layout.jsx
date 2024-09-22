import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import GroupDetails from '../Dashboard/UserGroup/GroupDetails';
import { useSelector } from 'react-redux';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isGroupDetailsVisible = useSelector((state) => {
        console.log("Group details visibility:", state.groupDetails.isVisible);
        return state.groupDetails.isVisible;
    });

    const groupData = useSelector((state) => {
        console.log("Group data:", state.groupDetails.groupData);
        return state.groupDetails.groupData;
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="flex min-h-screen relative">
            {isGroupDetailsVisible && <GroupDetails data={groupData} />}
            {/* Sidebar: always shown on larger screens, full-width on mobile */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                className={`fixed md:relative md:w-64 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            />
            <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-0' : 'md:ml-64'} transition-all duration-300`}>
                {/* Main content area */}
                <Topbar toggleSidebar={toggleSidebar} />
                <main className="flex-1 mt-16 p-4">
                    {children}
                </main>
            </div>

        </div>
    );
}
