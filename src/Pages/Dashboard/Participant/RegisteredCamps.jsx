import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import Loading from '../../../Shared/Loading';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ['registered-camps', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-camp?email=${user.email}`);
      return res.data;
    },
  });

  // Search Filter
  const filteredCamps = registeredCamps.filter((camp) => {
    const keyword = search.toLowerCase();
    return (
      camp.campName.toLowerCase().includes(keyword) ||
      camp.participantName.toLowerCase().includes(keyword) ||
      camp.date.toLowerCase().includes(keyword)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Registered Camps</h2>

      <div className="flex justify-end mb-4">
        <div className="flex items-center border rounded">
          <input
            type="text"
            className="input input-sm"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="ml-2 mr-2 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-blue-100">
              <th>#</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Participant</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp, index) => (
              <tr key={camp._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.participantName}</td>
                <td>
                  {camp.payment_status === 'paid' ? (
                    <span className="text-green-600 font-medium">Paid</span>
                  ) : (
                    <button className="btn btn-xs btn-warning">Pay</button>
                  )}
                </td>
                <td className="capitalize">{camp.confirmation_status}</td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-info">Feedback</button>
                  <button
                    className="btn btn-xs btn-error"
                    disabled={camp.payment_status === 'paid'}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegisteredCamps;
