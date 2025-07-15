import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaStar } from 'react-icons/fa';

const FeedbackCarousel = () => {
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedback');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading Feedback...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-20">
      <h2 data-aos="fade-up" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-8 md:mb-18">What Participants Say</h2>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        showArrows={true}
        swipeable={true}
        dynamicHeight={false}
      >
        {feedbacks.map((fb) => (
          <div data-aos="fade-up" key={fb._id} className="flex flex-col items-center gap-4 bg-white rounded-lg p-6 shadow-md">
            <img
              src={fb.participantPhoto}
              alt={fb.participantName}
              className="w-20 h-20 rounded-full object-contain border border-blue-200"
            />
            <h3 className="text-xl font-semibold">{fb.participantName}</h3>
            <p className="text-sm text-gray-500">{fb.participantEmail}</p>
            <h3 className="text-xl font-semibold">Camp: {fb.campName}</h3>
            <div className="flex text-yellow-400">
              {[...Array(fb.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-gray-700 italic text-center mb-4 max-w-xl">“{fb.feedback}”</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeedbackCarousel;