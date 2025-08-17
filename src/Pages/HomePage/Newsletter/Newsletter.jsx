import React from 'react';
import Swal from 'sweetalert2';

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Subscribed Successfully! 🎉',
      text: 'Thank you for joining our newsletter. You’ll now get the latest lost & found updates!',
      icon: 'success',
      confirmButtonText: 'Awesome!'
    });
  };

  return (
    <section data-aos="fade-up" className=" lg:py-30 md:py-28 py-14 pb- px-6 md:px-20 mt-12 rounded-2xl">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className=' text-primary/70'>Stay Updated with</span> <span className="">Medicamp</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about newly added camps, 
          camp success stories, and helpful tips to keep your health safe.
        </p>

        {/* Form */}
        <form 
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full md:w-2/3 p-3 rounded-lg border border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/70"
          />
          <button
            type="submit"
            className="px-6 py-3 text-white bg-primary/70 font-semibold rounded-lg shadow-md hover:bg-primary/90 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            Subscribe
          </button>
        </form>

        {/* Extra Info */}
        <div className="mt-6 text-sm">
          We care about your privacy. Unsubscribe anytime.  
        </div>
      </div>
    </section>
  );
};

export default Newsletter;