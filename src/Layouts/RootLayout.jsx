import React, { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';

const RootLayout = () => {
    const navigation = useNavigation();
    console.log(navigation)
    return (
        <>
            <nav>
                <Navbar></Navbar>
            </nav>

            <main>
                <Suspense fallback={<Loading />}>
                {navigation.state === 'loading' ? <Loading /> : <Outlet></Outlet>}
                </Suspense>
            </main>

            <footer>

            </footer>
        </>
    );
};

export default RootLayout;