import React from 'react';

const AboutUs = () => {
    return (
        <div className='min-h-screen'>
            <div data-aos="fade-up" className="max-w-5xl mx-auto px-4 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary/70">About MediCamp</h2>
                <p className="text-lg text-center mb-8">
                    MediCamp is a community-driven platform that brings healthcare directly to the people through organized medical camps.
                    We connect professional organizers, healthcare providers, and participants to ensure accessible, affordable, and quality care for all.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">
                    <div className="p-6 shadow-xl bg-base-100 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">🔬 Mission</h3>
                        <p className="">To provide accessible medical care through organized and reliable camp systems.</p>
                    </div>
                    <div className="p-6 shadow-xl bg-base-100 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">🌍 Vision</h3>
                        <p className="">Empowering rural and underserved communities with health services.</p>
                    </div>
                    <div className="p-6 shadow-xl bg-base-100 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">🤝 Our Team</h3>
                        <p className="">Organizers, participants & healthcare professionals working together to improve lives.</p>
                    </div>

                    {/* New 3 cards */}
                    <div className="p-6 shadow-xl bg-base-100 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">📝 Easy Registration</h3>
                        <p>Simple and user-friendly registration process for both organizers and participants.</p>
                    </div>
                    <div className="p-6 shadow-xl bg-base-100 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">💳 Secure Payments</h3>
                        <p>Simple and user-friendly registration process for both organizers and participants.</p>
                    </div>
                    <div className="p-6 shadow-xl bg-base-100 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">📊 Real-Time Management</h3>
                        <p>Track camps, participants, and feedback in real time for better organization.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
