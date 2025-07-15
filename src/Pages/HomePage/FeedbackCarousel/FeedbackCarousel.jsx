import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Shared/Loading';

const FeedbackCarousel = () => {
  const axiosPublic = useAxios();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await axiosPublic.get('/feedback');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto p-4 my-12">
      <h2 className="text-3xl font-bold text-center mb-8">What Participants Say</h2>
      <Slider {...settings}>
        {feedbacks.map((fb) => (
          <div key={fb._id} className="px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 h-full">
              <div className="flex items-center gap-4 mb-4">
                <img src={fb.userImage} alt={fb.userName} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold">{fb.userName}</h4>
                  <p className="text-sm text-gray-500">{fb.userEmail}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{fb.feedback}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <FaStar
                    key={val}
                    className={`text-xl ${val <= fb.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeedbackCarousel;