import React from 'react';
import { NavLink, useNavigate } from 'react-router';

const SiteLogo = () => {
    const navigate = useNavigate()
    const handleReload = () => {
        navigate('/')
        window.location.reload();
    }
    return (
        <NavLink onClick={handleReload} to='/'>
            <div className='flex items-center hover:scale-105 transition-all w-fit'>
                <img className='mb-1 h-12 w-12' src="https://img.icons8.com/?size=160&id=YKmWcwT48liT&format=png" alt="" />
                <p className='-ml-2 md:ml-0 md:mb-1 mb-2 text-2xl md:text-3xl font-extrabold text-white'>MediCamp</p>
            </div>
        </NavLink>
    );
};

export default SiteLogo;