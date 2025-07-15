import { motion } from 'framer-motion';
import { FaChartPie, FaUserCircle, FaClipboardList, FaMoneyCheckAlt } from 'react-icons/fa';

const features = [
    {
        title: 'Analytics',
        description: 'Track your camp registrations, participation and feedback with easy-to-understand charts.',
        icon: <FaChartPie size={40} className="text-indigo-600" />,
    },
    {
        title: 'Participant Profile',
        description: 'View and manage your profile, update personal details, and stay connected.',
        icon: <FaUserCircle size={40} className="text-pink-500" />,
    },
    {
        title: 'Registered Camps',
        description: 'Check all the camps you have joined and get quick access to upcoming events.',
        icon: <FaClipboardList size={40} className="text-green-600" />,
    },
    {
        title: 'Payment History',
        description: 'Easily view all your completed camp payments and transaction statuses.',
        icon: <FaMoneyCheckAlt size={40} className="text-yellow-500" />,
    },
];

const ParticipantFeatures = () => {
    return (
        <section className="bg-blue-50 py-12 px-4 md:px-8 w-full md:w-10/12 mx-auto rounded-2xl">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl text-blue-400 md:text-4xl font-bold mb-4">What Our Participants Can Do</h2>
                <p className="text-gray-600 mb-10">Empowering participants with tools to manage, track, and enjoy their healthcare experience.</p>

                <figure className='flex justify-center items-center my-14'>
                    <img data-aos='fade-up'
                        className='w-96'
                        src="https://i.postimg.cc/mrDVZmPj/biopharmacology-products-abstract-concept-vector-illustration-107173-29450-removebg-preview.png" alt="" />
                </figure>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
                        >
                            {feature.icon}
                            <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ParticipantFeatures;
