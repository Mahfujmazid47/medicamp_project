import React, { Suspense } from 'react';
import { Link, NavLink, Outlet, useNavigate, useNavigation } from 'react-router';
import { FaHome, FaUsers, FaUser, FaChartLine, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import { FaPlus, FaEdit } from 'react-icons/fa';
// import useUserRole from '../Hooks/useUserRole';
import SiteLogo from '../Shared/SiteLogo';
import Loading from '../Shared/Loading';
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
    const navigation = useNavigation();
    const { role, isRoleLoading } = useUserRole();
    // console.log(role, isRoleLoading)
    const navigate = useNavigate();
    const handleReload = () => {
        navigate('/')
        window.location.reload('/');

    }
    return (
        <div>
            <div className="drawer lg:drawer-open bg-gradient-to-br from-primary/20 to-secondary/10">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden ">
                        <div className="flex-none lg:hidden ">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">Dashboard</div>

                    </div>
                    {/* Page content here */}

                    <Suspense fallback={<Loading />}>
                        {navigation.state === 'loading' ? <Loading /> : <Outlet></Outlet>}
                    </Suspense>

                    {/* Page content here */}

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu text-base-content min-h-full w-50 md:w-60 p-4 bg-gradient-to-r from-primary/30 to-secondary/10 backdrop-blur-xl">
                        {/* Sidebar content here */}
                        <SiteLogo></SiteLogo>

                        <li>
                            <NavLink onClick={handleReload} to='/' className="flex font-semibold items-center gap-2">
                                <FaHome /> Home
                            </NavLink>
                        </li>



                        {/* Organizer Links */}
                        {!isRoleLoading && role === 'organizer' &&
                            <>
                                <li>
                                    <NavLink to='/dashboard/profile' className="flex items-center gap-2 font-bold">
                                        <FaUser /> Organizer Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/add-camp' className="flex items-center gap-2 font-bold">
                                        <FaPlus /> Add A Camp
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manage-camps' className="flex items-center gap-2 font-bold">
                                        <FaEdit /> Manage Camps
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manage-registered' className="flex items-center gap-2 font-bold">
                                        <FaUsers /> Manage Registered
                                    </NavLink>
                                </li>
                            </>
                        }


                        {/* Participant Links */}
                        {!isRoleLoading && role === 'participant' &&
                            <>
                                <li>
                                    <NavLink to='/dashboard/analytics' className="flex items-center gap-2 font-bold">
                                        <FaChartLine /> Analytics
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/profile' className="flex items-center gap-2 font-bold">
                                        <FaUser /> Participant Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/registered-camps' className="flex items-center gap-2 font-bold">
                                        <FaClipboardList /> Registered Camps
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/payment-history' className="flex items-center gap-2 font-bold">
                                        <FaMoneyBillWave /> Payment History
                                    </NavLink>
                                </li>
                            </>
                        }


                        <label className="flex cursor-pointer gap-2 mt-3 lg:pl-2 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                            <input type="checkbox" value="dark" className="toggle theme-controller text-sm" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </label>



                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;