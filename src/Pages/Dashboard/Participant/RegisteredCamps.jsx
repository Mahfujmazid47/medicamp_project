import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const RegisteredCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ['registered-camps', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-camp?email=${user.email}`);
            return res.data;
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
        }
    });

    const handleCancel = (id, campId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate({ id, campId });
            }
        });
    };

    const handlePay = (camp) => {
        navigate('/payment', { state: { camp } });
    };

    const filteredCamps = registeredCamps.filter((camp) => {
        const keyword = search.toLowerCase();
        return (
            camp.campName.toLowerCase().includes(keyword) ||
            camp.participantName.toLowerCase().includes(keyword) ||
            camp.date.toLowerCase().includes(keyword)
        );
    });

    const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
    const paginatedCamps = filteredCamps.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 w-full max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Registered Camps</h2>

            <div className="flex justify-center mb-4">
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
                            <th>Camp Fees</th>
                            <th>Participant Name</th>
                            <th>Payment status</th>
                            <th>Confirmation status</th>
                            <th>Feedback</th>
                            <th>Cancel</th>
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
                                        <button className="btn btn-xs btn-warning" onClick={() => handlePay(camp)}>Pay</button>
                                    )}
                                </td>
                                <td>
                                    {camp.payment_status === 'paid' ? (
                                        <span className="font-medium">Confirmed</span>
                                    ) : (
                                        <span className="font-medium">Pending</span>
                                    )}
                                </td>

                                <td>
                                    {camp.payment_status === 'paid' ? (
                                        <button className="btn btn-xs btn-info">Feedback</button>
                                    ) : (
                                        <button disabled className="btn btn-xs btn-warning">N/A</button>
                                    )}
                                </td>

                                <td>
                                    <button
                                        className="btn btn-xs btn-error"
                                        disabled={camp.payment_status === 'paid'}
                                        onClick={() => handleCancel(camp._id, camp.campId)}
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
