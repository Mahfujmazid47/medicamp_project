import React, { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import ScrollToTop from '../Shared/ScrollToTop';

const RootLayout = () => {
    const navigation = useNavigation();
    // console.log(navigation)
    return (
        <>
            <nav className=''>
                <Navbar></Navbar>
            </nav>

            <main className='bg-gradient-to-r from-primary/20 to-secondary/10 pt-16'>
                <Suspense fallback={<Loading />}>
                    {navigation.state === 'loading' ? <Loading /> : <Outlet></Outlet>}
                </Suspense>
            </main>

            <footer>
                <Footer></Footer>
            </footer>

            <ScrollToTop />
        </>
    );
};

export default RootLayout;