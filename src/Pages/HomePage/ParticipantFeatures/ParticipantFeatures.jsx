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
        <div className='py-20'>
            <section className="bg-gradient-to-br from-primary/30 to-secondary/10 py-12 px-4 md:px-8 w-full md:w-10/12 mx-auto rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out ">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl text-primary/70 md:text-4xl font-bold mb-4">What Our Participants Can Do</h2>
                <p className=" mb-10">Empowering participants with tools to manage, track, and enjoy their healthcare experience.</p>

                <figure className='flex justify-center items-center my-14'>
                    <img data-aos='fade-up' data-aos-duration="2000"
                        className='w-96'
                        src="https://i.postimg.cc/mrDVZmPj/biopharmacology-products-abstract-concept-vector-illustration-107173-29450-removebg-preview.png" alt="" />
                </figure>

                <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            // whileHover={{ scale: 1.05 }}
                            // whileInView={{ opacity: 1, y: 0 }}
                            // initial={{ opacity: 0, y: 30 }}
                            // transition={{ duration: 0.4 }}
                            className="bg-base-100 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-103 transition-all duration-200 ease-in-out hover:shadow-2xl"
                        >
                            {feature.icon}
                            <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
                            <p className="text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </div>
    );
};

export default ParticipantFeatures;
