import React from 'react';

import SidebarMenu from './SidebarMenu'; 

export default function Sidebar({ isSidebarOpen  }) {
  return (
    <aside className={`fixed top-0 left-0 z-10 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 md:w-64 shadow text-white bg-white h-full p-4`}>
    <SidebarMenu />
    </aside>
  );
};


