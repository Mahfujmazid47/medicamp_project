import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Shared/Loading';
import { FaArrowRight } from 'react-icons/fa';


const PopularCamps = () => {
    const axiosPublic = useAxios();

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['popularCamps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // 🔹 Sort camps by participant count & pick top 6
    const popularCamps = [...camps]
        .sort((a, b) => b.participantCount - a.participantCount)
        .slice(0, 6);

    return (
        <section className="my-12 md:my-24 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 data-aos='fade-up' duration='3000' className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-14 text-primary/70">Popular Medical Camps</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {popularCamps.map((camp) => (
                    <div data-aos='fade-up' duration='3000' key={camp._id} className="rounded-xl shadow-lg overflow-hidden  transition duration-300 bg-base-100 ">
                        <img src={camp.image} alt={camp.campName} className="w-full h-48 object-cover" />
                        <div className="p-4 space-y-1">
                            <h3 className="text-xl font-semibold mb-2">{camp.campName}</h3>
                            {/* <p><strong>Fees:</strong> ${camp.fees}</p> */}
                            <p><strong>Date & Time:</strong> {camp.date} at {camp.time}</p>
                            <p><strong>Location:</strong> {camp.location}</p>
                            {/* <p><strong>Doctor:</strong> {camp.healthcareProfessional}</p> */}
                            <p><strong>Participants: <span className='badge bg-primary/70 text-white'>{camp.participantCount}</span></strong></p>

                            <Link className='flex items-end justify-end' to={`/camp-details/${camp._id}`}>
                                <button className="btn hover:scale-110 transition bg-primary/70 text-white mt-3">Details <FaArrowRight /></button>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>

            <div data-aos="fade-up" className="flex justify-center mt-8">
                <Link to="/available-camps">
                    <button  className="btn bg-primary/70 text-white hover:scale-110 transition px-6">See All Camps <FaArrowRight /></button>
                </Link>
            </div>
        </section>
    );
};

export default PopularCamps;
