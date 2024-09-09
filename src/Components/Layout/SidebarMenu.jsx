
import React from 'react';
import MenuItem from './MenuItem'; 


const menuData = [
  {
    title: 'Dashboard',
    icon: 'LockClosedIcon', 
    path: '/mapospace-frontend/dashboard',
  },
  // {
  //   title: 'User List',
  //   icon: 'LockClosedIcon', 
  //   path: '/mapospace-frontend/user-list',
  // },

  {
    title: 'User Management',
    icon: 'UserIcon',
    path: '/user-management',
    subItems: [
      {
        title: 'User List',
       
        path: '/mapospace-frontend/user-list',
      },
    ],
  },
  // {
  //   title: 'User Groups',
  //   icon: 'UserGroupIcon',
  //   path: '/user-groups',
  //   subItems: [
  //     {
  //       title: 'Admins',
  //       path: '/user-groups/admins',
  //     },
  //     {
  //       title: 'Editors',
  //       path: '/user-groups/editors',
  //     },
  //   ],
  // },
];

export default function SidebarMenu() {
  return (
    <div className="mt-16">
    <ul className="space-y-4">
      {menuData.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ul>
    </div>
  );
};


