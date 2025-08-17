import React from 'react';

const ContactUs = () => {
    return (
        <div data-aos="fade-up" className="max-w-3xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

            <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input type="email" placeholder="you@example.com" className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Message</label>
                    <textarea placeholder="Your message..." className="textarea textarea-bordered w-full h-32"></textarea>
                </div>
                <button type="submit" className="btn bg-primary/70 w-full">Send Message</button>
            </form>

            <div className="text-center mt-8">
                <p>📧 Email: support@medicamp.com</p>
                <p>📞 Phone: +8801XXXXXXXXX</p>
            </div>
        </div>
    );
};

export default ContactUs;