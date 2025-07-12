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
            }
        ]
    },
    {
        path: "/*",
        Component: ErrorPage
    }
]);
