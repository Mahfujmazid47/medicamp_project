import React from 'react';
import Banner from '../Banner/Banner';
import PopularCamps from '../PopularCamps/PopularCamps';

const Home = () => {
    return (
        <>
            <section>
                <Banner></Banner>
            </section>

            {/* PopularCamps  */}
            <section>
                <PopularCamps></PopularCamps>
            </section>
        </>
    );
};

export default Home;