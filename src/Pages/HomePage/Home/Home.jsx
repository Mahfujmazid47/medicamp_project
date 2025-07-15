import React from 'react';
import Banner from '../Banner/Banner';
import PopularCamps from '../PopularCamps/PopularCamps';
import FeedbackCarousel from '../FeedbackCarousel/FeedbackCarousel';

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
            
            {/* FeedbackCarousel  */}
            <section>
                <FeedbackCarousel></FeedbackCarousel>
            </section>
        </>
    );
};

export default Home;