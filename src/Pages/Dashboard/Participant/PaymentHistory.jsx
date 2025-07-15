import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import Loading from '../../../Shared/Loading';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-success?email=${user.email}`);
      return res.data;
    },
  });

  const filteredPayments = payments.filter((payment) => {
    const keyword = search.toLowerCase();
    return (
      payment.campName.toLowerCase().includes(keyword) ||
      payment.transactionId.toLowerCase().includes(keyword)
    );
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <Loading />;

  return (
    <div data-aos='fade-up' className="p-4 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl text-primary font-bold mb-4 text-center">Your Payment History</h2>

      <div className="flex justify-center mb-4">
          <input
            type="text"
            className="input input-sm w-full md:w-1/2"
            placeholder="Search by Camp or Transaction ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-blue-100">
              <th>#</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Transaction ID</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{payment.campName}</td>
                <td>${payment.amount}</td>
                <td className="text-xs break-all">{payment.transactionId}</td>
                <td className="text-green-600 font-medium">{payment.payment_status}</td>
                <td className="capitalize font-medium">{payment.confirmation_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default PaymentHistory;
