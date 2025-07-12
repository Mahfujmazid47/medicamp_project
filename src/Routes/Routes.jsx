import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/HomePage/Home/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Pages/Authentication/Login/Login';
import Registration from '../Pages/Authentication/Registration/Registration';
import DashboardLayout from '../Layouts/DashboardLayout';
import ErrorPage from '../Shared/ErrorPage';
import PrivateRoute from './PrivateRoute';
import OrganizerProfile from '../Pages/Dashboard/Organizer/OrganizerProfile';
import AddCamp from '../Pages/Dashboard/Organizer/AddCamp';
import ManageCamps from '../Pages/Dashboard/Organizer/ManageCamps';
import UpdateCamp from '../Pages/Dashboard/Organizer/UpdateCamp';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Registration
            },
        ]
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                path: "/dashboard/profile",
                element: (
                    <PrivateRoute>
                        <OrganizerProfile></OrganizerProfile>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/add-camp",
                element: (
                    <PrivateRoute>
                        <AddCamp></AddCamp>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/manage-camps",
                element: (
                    <PrivateRoute>
                        <ManageCamps></ManageCamps>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/update-camp/:campId",
                element: (
                    <PrivateRoute>
                        <UpdateCamp></UpdateCamp>
                    </PrivateRoute>
                )
            },
        ]
    },
    {
        path: "/*",
        Component: ErrorPage
    }
]);
