import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Shared/Loading';

const AvailableCamps = () => {
  const axiosPublic = useAxios();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['allCamps'],
    queryFn: async () => {
      const res = await axiosPublic.get('/camps');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {camps.map(camp => (
        <div data-aos='zoom-in' duration='4000' key={camp._id} className="card bg-base-100 shadow-lg rounded-lg">
          <figure>
            <img src={camp.image} alt={camp.campName} className="h-48 w-full object-cover rounded-t-lg" />
          </figure>
          <div className="card-body space-y-2">
            <h2 className="text-xl font-semibold">{camp.campName}</h2>
            <p><span className="font-semibold">Date:</span> {camp.date} at {camp.time}</p>
            <p><span className="font-semibold">Location:</span> {camp.location}</p>
            <p><span className="font-semibold">Doctor:</span> {camp.healthcareProfessional}</p>
            <p><span className="font-semibold">Participants:</span> {camp.participantCount}</p>
            <p className="text-sm">{camp.description?.slice(0, 80)}...</p>
            <div className="card-actions justify-end">
              <Link to={`/camp-details/${camp._id}`}>
                <button className="btn btn-sm btn-primary">Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableCamps;
