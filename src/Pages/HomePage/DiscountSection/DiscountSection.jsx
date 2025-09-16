import { FaTag } from "react-icons/fa";
import { Link } from "react-router";

const DiscountSection = () => {
    return (
        <section data-aos='fade-up' className="w-10/12 mx-auto bg-gradient-to-br from-primary/40 to-secondary/20 py-10 px-4 text-center rounded-xl shadow-md mt-8">
            <div className="max-w-xl mx-auto">
                {/* Heading */}
                <div className="flex justify-center items-center gap-2 mb-3">
                    <FaTag className="text-primary/70 text-2xl" />
                    <h2 className="text-2xl md:text-3xl font-bold text-primary/70">
                        Limited Time Offer!
                    </h2>
                </div>

                {/* Offer */}
                <h3 className="text-4xl md:text-6xl font-extrabold text-secondary mb-2">
                    50% OFF
                </h3>
                <p className="text-sm md:text-base  mb-4">
                    Valid for the first 100 registrations only
                </p>

                {/* CTA */}
                <Link to="/available-camps">
                    <button className="btn bg-primary/70 text-white border-none hover:scale-105 transition px-6">
                        Book Now
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default DiscountSection;
