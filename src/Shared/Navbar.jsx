import React from 'react';
import SiteLogo from './SiteLogo';
import { NavLink } from 'react-router';

const Navbar = () => {

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

                <>
                    <NavLink to='/auth/login' className="btn border-blue-100 p-2 md:p-4 border-2 text-blue-400 bg-white">Join Us</NavLink>

                </>

                {/* {
                    user ?
                        <>
                            <img src={user.photoURL} alt="profile pic"
                                className='w-12 h-12 rounded-full text-gray-400 hover:text-gray-600 transition duration-200'
                            />
                            <button onClick={handleLogout} className="btn border-primary border-2 p-2 md:p-4 text-secondary bg-white">Logout</button>
                        </>
                        :
                        <>
                            <NavLink to='/login' className="btn border-primary p-2 md:p-4 border-2 text-secondary bg-white">Sign In</NavLink>

                            <NavLink to='/register' className="btn border-primary p-2 md:p-4 border-2 bg-primary text-white">Sign Up</NavLink>
                        </>
                } */}
            </div>
        </div>
    );
};

export default Navbar;