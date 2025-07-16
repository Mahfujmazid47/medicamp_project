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
import AvailableCamps from '../Pages/AvailableCamps/AvailableCamps/AvailableCamps';
import CampDetails from '../Pages/CampDetails/CampDetails';
import RegisteredCamps from '../Pages/Dashboard/Participant/RegisteredCamps';
import Payment from '../Pages/Dashboard/Participant/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import PaymentHistory from '../Pages/Dashboard/Participant/PaymentHistory';
import Analytics from '../Pages/Dashboard/Participant/Analytics';
import ManageRegisteredCamps from '../Pages/Dashboard/Organizer/ManageRegisteredCamps';


export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/available-camps",
                Component: AvailableCamps,
            },
            {
                path: "/camp-details/:campId",
                element: (
                    <PrivateRoute>
                        <CampDetails></CampDetails>
                    </PrivateRoute>
                )
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
            {
                path: '/dashboard/registered-camps',
                element: (
                    <PrivateRoute>
                        <RegisteredCamps></RegisteredCamps>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/payment",
                element: (
                    <Elements stripe={stripePromise}>
                        <Payment />
                    </Elements>
                )
            },
            {
                path: "/dashboard/payment-history",
                element: (
                    <PrivateRoute>
                        <PaymentHistory></PaymentHistory>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/analytics",
                element: (
                    <PrivateRoute>
                        <Analytics></Analytics>
                    </PrivateRoute>
                )
            },
            {
                path: "/dashboard/manage-registered",
                element: (
                    <PrivateRoute>
                        <ManageRegisteredCamps></ManageRegisteredCamps>
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
