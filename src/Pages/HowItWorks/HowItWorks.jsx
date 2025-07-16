import React from 'react';

const HowItWorks = () => {
    return (
        <div data-aos="fade-up" className="max-w-5xl mx-auto px-4 py-12 md:py-24">
            <h2 className="text-4xl font-bold text-center mb-10">How MediCamp Works</h2>

            <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-xl font-bold mb-2">📝 Register</h3>
                    <p className="text-gray-600">Participants sign up and register for available medical camps.</p>
                </div>
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-xl font-bold mb-2">💳 Payment & Confirmation</h3>
                    <p className="text-gray-600">Securely pay online and get confirmation from the organizer.</p>
                </div>
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-xl font-bold mb-2">🏥 Attend Camp</h3>
                    <p className="text-gray-600">Visit the camp on the scheduled date and receive healthcare services.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;