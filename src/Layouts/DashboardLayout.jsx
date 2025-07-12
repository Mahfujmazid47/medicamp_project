import React, { Suspense } from 'react';
import { Link, NavLink, Outlet, useNavigate, useNavigation } from 'react-router';
import { FaHome, FaBoxOpen, FaHistory, FaSearchLocation, FaUserEdit, FaUsers, FaUserClock, FaUserTimes, FaUserShield, FaMotorcycle, FaShippingFast, FaUser } from "react-icons/fa";
import { FaPlus, FaEdit } from 'react-icons/fa';
// import useUserRole from '../Hooks/useUserRole';
import SiteLogo from '../Shared/SiteLogo';
import Loading from '../Shared/Loading';
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
    const navigation = useNavigation();
    const { role, isRoleLoading } = useUserRole();
    console.log(role, isRoleLoading)
    const navigate = useNavigate();
    const handleReload = () => {
        navigate('/')
        window.location.reload('/');

    }
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none lg:hidden">
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
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-50 md:w-60 p-4">
                        {/* Sidebar content here */}
                        <SiteLogo></SiteLogo>

                        <li>
                            <NavLink onClick={handleReload} to='/' className="flex items-center gap-2">
                                <FaHome /> Home
                            </NavLink>
                        </li>



                        {/* Organizer Links */}
                        {!isRoleLoading && role === 'organizer' &&
                            <>
                                <li>
                                    <NavLink to='/dashboard/profile' className="flex items-center gap-2">
                                        <FaUser /> Organizer Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/add-camp' className="flex items-center gap-2">
                                        <FaPlus /> Add A Camp
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manage-camps' className="flex items-center gap-2">
                                        <FaEdit /> Manage Camps
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manage-registered' className="flex items-center gap-2">
                                        <FaUsers /> Manage Registered
                                    </NavLink>
                                </li>
                            </>
                        }




                        {/* Rider links */}
                        {/* {!isRoleLoading && role === 'rider' &&
                            <>
                                <li>
                                    <Link to="/dashboard/pending-deliveries" className="flex items-center gap-2">
                                        <FaShippingFast /> Pending Deliveries
                                    </Link>
                                </li>
                            </>
                        } */}



                        {/* Admin links */}
                        {/* {!isRoleLoading && role === 'admin' &&
                            <>
                                <li>
                                    <Link to="/dashboard/assign-riders" className="flex items-center gap-2">
                                        <FaMotorcycle /> Assign Riders
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/dashboard/activeRiders' className="flex items-center gap-2">
                                        <FaUsers className="text-green-600" /> Active Riders
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/pendingRiders' className="flex items-center gap-2">
                                        <FaUserClock className="text-yellow-500" /> Pending Riders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/rejectedRiders" className="flex items-center gap-2">
                                        <FaUserTimes className='text-red-500' /> Rejected Riders
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/dashboard/manageUsers" className="flex items-center gap-2">
                                        <FaUserShield /> Manage Users
                                    </Link>
                                </li>

                            </>
                        } */}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;