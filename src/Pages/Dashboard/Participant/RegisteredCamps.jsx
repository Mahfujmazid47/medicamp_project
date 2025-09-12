import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FaSearch, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { Dialog } from '@headlessui/react';
import useUserRole from '../../../Hooks/useUserRole';
import NoRegisteredCamps from './NoRegisteredCamps';

const RegisteredCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(5);
    const {role, isRoleLoading} = useUserRole();

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ['registered-camps', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-camp?email=${user.email}&role=${role}`);
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
        navigate('/dashboard/payment', { state: { camp } });
    };

    const openFeedbackModal = (camp) => {
        setSelectedCamp(camp);
        setIsFeedbackOpen(true);
    };

    const submitFeedback = async () => {
        if (!feedbackText || !rating) {
            Swal.fire('Warning', 'Please fill out all fields.', 'warning');
            return;
        }

        const feedbackData = {
            campId: selectedCamp.campId,
            campName: selectedCamp.campName,
            participantEmail: user.email,
            participantName: user.displayName,
            participantPhoto: user.photoURL,
            rating,
            feedback: feedbackText,
            date: new Date(),
        };

        try {
            const res = await axiosSecure.post('/feedback', feedbackData);
            // console.log(res.data)
            if (res.data.insertedId) {
                Swal.fire('Thank you!', 'Your feedback has been submitted.', 'success');
                setIsFeedbackOpen(false);
                setFeedbackText('');
                setRating(5);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to submit feedback.', 'error',error);
        }
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

    if (isLoading || isRoleLoading) return <Loading />;

    if(paginatedCamps.length < 1) return <NoRegisteredCamps />;

    return (
        <div data-aos='fade-up' className="p-4 w-full max-w-7xl mx-auto">
            <h2 className={`text-3xl text-primary/70 font-bold mb-4 text-center  ${isFeedbackOpen && 'opacity-10'}`} >Your Registered Camps</h2>

            <div className={`flex justify-center mb-4  ${isFeedbackOpen && 'opacity-10'}`}>

                    <input
                        type="text"
                        className="input input-sm w-full md:w-1/2"
                        placeholder="Search by Camp Name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

            </div>

            <div className={`overflow-x-auto ${isFeedbackOpen && 'opacity-10'}`}>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-primary/30">
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
                                        <button
                                            className="btn btn-xs btn-warning"
                                            onClick={() => handlePay(camp)}
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {camp.payment_status === 'paid' ? (
                                        <span className="font-medium">Confirmed</span>
                                    ) : (
                                        <button className="font-medium">Pending</button>
                                    )}
                                </td>

                                <td>
                                    {camp.payment_status === 'paid' ? (
                                        <button
                                            className="btn btn-xs btn-info"
                                            onClick={() => openFeedbackModal(camp)}
                                        >
                                            Feedback
                                        </button>
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
                        className={`btn btn-sm ${currentPage === i + 1 ? 'btn bg-primary/70 text-white' : 'btn-outline outline-primary/70'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Feedback Modal */}
            <Dialog open={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Panel className="bg-base-100 rounded-lg p-6 shadow-xl w-full max-w-md">
                        <Dialog.Title className="text-xl font-semibold mb-4">Leave Feedback for {selectedCamp?.campName}</Dialog.Title>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            placeholder="Write your feedback..."
                            rows={4}
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        ></textarea>
                        <label className="block mb-2 font-medium">Give Rating:</label>
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <FaStar
                                    key={val}
                                    onClick={() => setRating(val)}
                                    className={`cursor-pointer text-2xl ${val <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsFeedbackOpen(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={submitFeedback} className="btn bg-primary/70 text-white">Submit</button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default RegisteredCamps;
