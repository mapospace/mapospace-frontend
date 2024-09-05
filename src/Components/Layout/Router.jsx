import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'; 
import Dashboard from '../Dashboard/dashoard';
import GuardedRoute from '../Auth/routeguard'; 
import Userlist from '../Dashboard/UserManagement/UserList';

const LayoutRouter = () => {
    return (
        <Layout>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <GuardedRoute element={<Dashboard />} />
                    }
                />
                 <Route
                    path="/user-list"
                    element={
                        <GuardedRoute element={<Userlist />} />
                    }
                />
            </Routes>
        </Layout>
    );
};

export default LayoutRouter;
