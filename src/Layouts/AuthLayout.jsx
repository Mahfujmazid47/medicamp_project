import React, { Suspense } from 'react';
import SiteLogo from '../Shared/SiteLogo';
import Loading from '../Shared/Loading';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer';

const AuthLayout = () => {
    return (
        <>
            <nav>
                <Navbar></Navbar>
            </nav>
            
            <div className="flex flex-col lg:flex-row mx-auto">
                <div className='flex-1'>
                    <section className='min-h-screen flex justify-center items-center md:py-10'>
                        <Suspense fallback={<Loading />}>
                            <Outlet></Outlet>
                        </Suspense>
                    </section>
                </div>

                <figure className='flex-1 flex justify-center items-center'>
                    <img
                        src="https://img.freepik.com/free-vector/patient-being-examined-by-doctor-clinic-illustration_23-2148865216.jpg"
                        className="md:max-w-lg rounded-lg flex justify-center items-center"
                    />
                </figure>
            </div>

            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default AuthLayout;