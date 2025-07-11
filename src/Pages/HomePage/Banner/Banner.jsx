import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
    {
        id: 1,
        image: "https://img.freepik.com/premium-vector/migrant-family-doctor-tent-concept-banner-flat-style_98402-1337.jpg",
        title: "Successful Health Checkup Camp",
        description: "Over 500 patients served with free diagnostics and medicines."
    },
    {
        id: 2,
        image: "https://img.freepik.com/premium-vector/volunteers-2d-vector-isolated-illustration_151150-6588.jpg",
        title: "Volunteers in Action",
        description: "Medical students and doctors together changing lives in rural zones."
    },
    {
        id: 3,
        image: "https://img.freepik.com/free-vector/flat-world-humanitarian-day-illustration_52683-125639.jpg",
        title: "Free Medicine Distribution",
        description: "Essential medicines provided to hundreds in need during the camp."
    }
];

const Banner = () => {
    return (
        <div data-aos='zoom-in' duration='3000' className="mt-6 max-w-7xl mx-auto">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={2000}
                showArrows
                emulateTouch
            >
                {slides.map(slide => (
                    <div key={slide.id} className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                filter: 'brightness(40%)'
                            }}
                        ></div>

                        {/* Overlay Content */}
                        <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-8 md:px-20 text-white">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                            <p className="text-md md:text-lg max-w-2xl">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
