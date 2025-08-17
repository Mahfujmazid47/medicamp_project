import React from 'react';
import Banner from '../Banner/Banner';
import PopularCamps from '../PopularCamps/PopularCamps';
import FeedbackCarousel from '../FeedbackCarousel/FeedbackCarousel';
import ParticipantFeatures from '../ParticipantFeatures/ParticipantFeatures';
import Newsletter from '../Newsletter/Newsletter';

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

            {/* ParticipantFeatures  */}
            <section>
                <ParticipantFeatures></ParticipantFeatures>
            </section>

            {/* News letter */}
            <section>
                <Newsletter></Newsletter>
            </section>


        </>
    );
};

export default Home;