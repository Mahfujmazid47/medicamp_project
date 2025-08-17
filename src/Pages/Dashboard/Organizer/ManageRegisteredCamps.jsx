import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Shared/Loading';
import useUserRole from '../../../Hooks/useUserRole';

const ManageRegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {role, isRoleLoading} = useUserRole();

  const { data: registeredCamps = [], isLoading, refetch } = useQuery({
    queryKey: ['organizer-registered-camps', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-camp?email=${user.email}&role=${role}`);
      return res.data;
    },
  });

  const confirmStatusMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/register-camp/confirm/${id}`);
    },
    onSuccess: () => {
      Swal.fire('Confirmed!', 'Status updated successfully.', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update status.', 'error');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async ({ id, campId }) => {
      await axiosSecure.delete(`/register-camp/${id}`);
      await axiosSecure.patch(`/camps/decrement/${campId}`);
    },
    onSuccess: () => {
      Swal.fire('Cancelled!', 'Registration has been removed.', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel registration.', 'error');
    },
  });

  const handleCancel = (id, paymentStatus, confirmationStatus, campId) => {
    if (paymentStatus === 'paid' && confirmationStatus === 'confirmed') return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This registration will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate({ id, campId });
      }
    });
  };

  const filtered = registeredCamps.filter((camp) =>
    camp.campName.toLowerCase().includes(search.toLowerCase()) ||
    camp.participantName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading || isRoleLoading) return <Loading />;

  return (
    <div data-aos='fade-up' className="p-4 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl text-primary/70 font-bold mb-4 text-center">Manage Registered Camps</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          className="input input-sm"
          placeholder="Search by Camp or Participant"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-primary/30">
              <th>#</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((camp, index) => (
              <tr key={camp._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.participantName}</td>
                <td className="capitalize font-semibold">
                  {camp.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                </td>
                <td>
                  {camp.confirmation_status === 'confirmed' ? (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                  ) : camp.payment_status === 'paid' ? (
                    <button
                      className="btn btn-xs bg-primary/70 text-white"
                      onClick={() => confirmStatusMutation.mutate(camp._id)}
                    >
                      Pending
                    </button>
                  ) : (
                    <span className="">Pending</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    disabled={camp.payment_status === 'paid' && camp.confirmation_status === 'confirmed'}
                    onClick={() => handleCancel(camp._id, camp.payment_status, camp.confirmation_status,camp.campId)}
                  >
                    Cancel
                  </button>
                </td>
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
            className={`btn btn-sm ${currentPage === i + 1 ? 'btn bg-primary/70 text-white' : 'btn-outline outline-primary/70'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
