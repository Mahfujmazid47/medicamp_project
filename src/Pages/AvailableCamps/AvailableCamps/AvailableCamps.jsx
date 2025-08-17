import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Shared/Loading';
import { FaArrowRight } from 'react-icons/fa';

const AvailableCamps = () => {
  const axiosPublic = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [columnCount, setColumnCount] = useState(3);

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['availableCamps'],
    queryFn: async () => {
      const res = await axiosPublic.get('/camps');
      return res.data;
    }
  });

  const filteredAndSortedCamps = useMemo(() => {
    let filtered = camps.filter(camp =>
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.healthcareProfessional.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === 'mostRegistered') {
      filtered = filtered.sort((a, b) => b.participantCount - a.participantCount);
    } else if (sortOption === 'fees') {
      filtered = filtered.sort((a, b) => a.fees - b.fees);
    } else if (sortOption === 'name') {
      filtered = filtered.sort((a, b) => a.campName.localeCompare(b.campName));
    }

    return filtered;
  }, [searchTerm, sortOption, camps]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 data-aos='fade-up' className="text-3xl md:text-4xl font-bold mb-10 text-primary/70 text-center">Available Medical Camps</h2>

      <div data-aos='fade-up' data-aos-delay="100" className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name, date, doctor..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-52"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="fees">Camp Fees(low to high)</option>
          <option value="name">A-Z (Camp Name)</option>
        </select>

        <button
          onClick={() => setColumnCount(prev => prev === 3 ? 2 : 3)}
          className="btn btn-outline w-full md:w-auto"
        >
          {columnCount === 3 ? '2 Column View' : '3 Column View'}
        </button>
      </div>

      <div data-aos='fade-up' data-aos-delay="300" className={`grid gap-6 ${columnCount === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
        {filteredAndSortedCamps.map(camp => (
          <div data-aos='fade-up' key={camp._id} className="card bg-base-100 shadow-xl">
            <figure><img src={camp.image} alt={camp.campName} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title">{camp.campName}</h2>
              {/* <p><strong>Fees:</strong> ${camp.fees}</p> */}
              <p><strong>Date & Time:</strong> {camp.date}, {camp.time}</p>
              <p><strong>Location:</strong> {camp.location}</p>
              {/* <p><strong>Doctor:</strong> {camp.healthcareProfessional}</p> */}
              <p><strong>Participants: <span className='badge text-white bg-primary/70'>{camp.participantCount}</span></strong></p>
              {/* <p>{camp.description.slice(0, 80)}...</p> */}
              <div className="card-actions mt-2 justify-end">
                <Link to={`/camp-details/${camp._id}`} className="btn hover:scale-110 transition bg-primary/70 text-white">Details <FaArrowRight /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

  );
};

export default AvailableCamps;
