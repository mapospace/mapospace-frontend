import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'; 
import Dashboard from '../Dashboard/Dashboard';
import GuardedRoute from '../Auth/routeguard'; 
import Userlist from '../Dashboard/UserManagement/UserList';
import AddGroup from '../Dashboard/UserGroup/AddGroup'

const LayoutRouter = () => {
    return (
        <Layout>
            <Routes>
                <Route
                    path="dashboard"
                    element={
                        <GuardedRoute element={<Dashboard />} />
                    }
                />
                <Route
                    path="user-list"
                    element={
                        <GuardedRoute element={<Userlist />} />
                    }
                />
                <Route
                    path="user-group"
                    element={
                        <GuardedRoute element={<AddGroup />} />
                    }
                />
            </Routes>
        </Layout>
    );
};

export default LayoutRouter;
