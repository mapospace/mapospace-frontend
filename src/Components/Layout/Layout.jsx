import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import Topbar from './Topbar'; 

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="flex min-h-screen">
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
