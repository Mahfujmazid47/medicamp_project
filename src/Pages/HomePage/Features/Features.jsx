import { FaUserMd, FaRegCalendarCheck, FaLock, FaHeartbeat } from "react-icons/fa";
import { MdOutlinePayment, MdFeedback } from "react-icons/md";

const Features = () => {
  const features = [
    {
      icon: <FaUserMd className="text-4xl text-purple-600" />,
      title: "Expert Healthcare Professionals",
      desc: "Get access to certified doctors and medical experts for every camp.",
    },
    {
      icon: <FaRegCalendarCheck className="text-4xl text-blue-600" />,
      title: "Easy Camp Registration",
      desc: "Seamless and quick registration process for participants and organizers.",
    },
    {
      icon: <MdOutlinePayment className="text-4xl text-green-600" />,
      title: "Secure Online Payments",
      desc: "Hassle-free and secure payment gateway with multiple options.",
    },
    {
      icon: <FaLock className="text-4xl text-red-600" />,
      title: "Role-Based Authentication",
      desc: "Separate dashboards for Organizers and Participants to ensure safety.",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-pink-600" />,
      title: "Health Monitoring",
      desc: "Track medical records and provide personalized reports to participants.",
    },
    {
      icon: <MdFeedback className="text-4xl text-yellow-600" />,
      title: "Feedback & Reviews",
      desc: "Participants can share feedback to improve the overall experience.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 data-aos='fade-up' className="text-3xl md:text-4xl font-bold text-center text-primary/70 mb-12">
          Why Choose <span className="">MediCamp?</span>
        </h2>

        <div data-aos='fade-up' data-aos-delay='100'  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center">
                {feature.title}
              </h3>
              <p className=" text-center mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
