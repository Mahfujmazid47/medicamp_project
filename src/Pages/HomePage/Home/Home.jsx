import React from 'react';
import Banner from '../Banner/Banner';
import PopularCamps from '../PopularCamps/PopularCamps';
import FeedbackCarousel from '../FeedbackCarousel/FeedbackCarousel';
import ParticipantFeatures from '../ParticipantFeatures/ParticipantFeatures';
import Newsletter from '../Newsletter/Newsletter';
import FAQs from '../FAQs/FAQs';
import Features from '../Features/Features';
import DiscountSection from '../DiscountSection/DiscountSection';

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

            {/* DiscountSection */}
            <section className='py-8'>
                <DiscountSection></DiscountSection>
            </section>

            {/* Features  */}
            <section>
                <Features></Features>
            </section>

            {/* FeedbackCarousel  */}
            <section>
                <FeedbackCarousel></FeedbackCarousel>
            </section>

            {/* ParticipantFeatures  */}
            <section>
                <ParticipantFeatures></ParticipantFeatures>
            </section>

            {/* FAQs */}
            <section>
                <FAQs></FAQs>
            </section>

            {/* News letter */}
            <section>
                <Newsletter></Newsletter>
            </section>




        </>
    );
};

export default Home;