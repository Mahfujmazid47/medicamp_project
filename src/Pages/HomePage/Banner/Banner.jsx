import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';


const Banner = () => {
    return (
        <div className="relative h-[100vh] flex items-center justify-center bg-gray-900">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://img.freepik.com/premium-photo/futuristic-modern-medical-technology-style-abstract-background-molecule-spiral-dna_545033-3811.jpg?ga=GA1.1.1819153903.1738087789&semt=ais_incoming&w=740&q=80')",
                }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-6 md:px-12 text-left text-white">
                <h1 data-aos="fade-up" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    Empowering Communities with <br /> Accessible Medical Camps
                </h1>
                <p data-aos='fade-up' data-aos-delay='100' className="text-lg md:text-lg mb-6 max-w-2xl">
                    MediCamp makes healthcare accessible by connecting organizers,
                    participants, and healthcare professionals in one platform.
                </p>

                {/* CTA Buttons */}
                <div data-aos='fade-up' data-aos-delay='200' className="flex gap-4">
                    <Link to='/available-camps'>
                    <button className="bg-primary/70 hover:shadow-xl hover:-translate-y-1 font-semibold transition-all duration-300 text-white btn border-none rounded-lg md:text-lg shadow-lg">
                        Explore Camps
                    </button>
                    </Link>

                    <Link to='/auth/register'>
                        <button className="bg-white hover:shadow-xl hover:-translate-y-1 font-semibold transition-all duration-300 text-primary/70 hover:bg-gray-100 btn rounded-lg md:text-lg shadow-lg cursor-pointer">
                            Join Us <FaArrowRight />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;