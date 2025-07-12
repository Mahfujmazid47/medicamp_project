import React from 'react';
import SiteLogo from './SiteLogo';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import useRefreshUser from '../Hooks/useRefreshUser';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    useRefreshUser();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You have to login again then!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {

                logOut()
                    .then(() => {
                        navigate('/');
                    })
                    .catch(error => {
                        console.error(error)
                    })

                Swal.fire({
                    title: "Logged Out!",
                    text: "Logout Successfully.",
                    icon: "success"
                });
            }
        });


    }


    const navItems = <>
        <li><NavLink className='rounded-full lg:mr-2 mb-1' to="/">Home</NavLink></li>
        <li><NavLink className='rounded-full lg:mr-2 mb-1' to="/available-camps">Available Camps</NavLink></li>


        {/* {
            user && <>
                <li><NavLink className='rounded-full lg:mr-2 mb-1' to="/dashboard">Dashboard</NavLink></li>
            </>
        } */}


    </>

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <div>
                    <SiteLogo></SiteLogo>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end space-x-2">

                {
                    user ?
                        <>
                            {/* <img src={user.photoURL} alt="profile pic"
                                className='w-12 h-12 rounded-full text-gray-400 hover:text-gray-600 transition duration-200'
                            />
                            <button onClick={handleLogout} className="btn border-primary border-2 p-2 md:p-4 text-secondary bg-white">Logout</button> */}


                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="rounded-full">

                                    <img src={user.photoURL} alt="profile pic"
                                        className='w-12 h-12 hover:scale-105 cursor-pointer rounded-full transition duration-200'
                                    />

                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-1">

                                    <li className='font-bold mx-auto text-lg'>{user.displayName}</li>

                                    <li><NavLink to='/dashboard' className="btn hover:scale-103 transition p-2 md:p-4 text-white bg-blue-300">Dashboard</NavLink></li>

                                    <li><button onClick={handleLogout} className="btn hover:scale-103 transition bg-primary border-2 p-2 md:p-4 text-white">Logout</button></li>
                                </ul>
                            </div>
                        </>
                        :
                        <>
                            <NavLink to='/auth/login' className="btn border-blue-100 p-2 md:p-4 border-2 text-blue-400 bg-white">Join Us</NavLink>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;