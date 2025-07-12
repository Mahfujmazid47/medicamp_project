import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loading from '../../../Shared/Loading';
import NoCamps from './NoCamps';

const ManageCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 🔹 Load camps created by this organizer
    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['myCamps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camps?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // 🔹 Delete camp
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/delete-camp/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myCamps']);
            Swal.fire('Deleted!', 'Camp has been removed.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete camp.', 'error');
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this camp?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if(camps.length < 1){
        return <NoCamps />
    }

    return (
        <div data-aos='zoom-out' duration='2000' className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Your Camps</h2>

            {isLoading ? <Loading /> : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-blue-100">
                            <tr>
                                <th>#</th>
                                <th>Camp Name</th>
                                <th>Date & Time</th>
                                <th>Location</th>
                                <th>Healthcare Professional</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {camps.map((camp, index) => (
                                <tr key={camp._id}>
                                    <td>{index + 1}</td>
                                    <td>{camp.campName}</td>
                                    <td>{camp.date}</td>
                                    <td>{camp.location}</td>
                                    <td>{camp.healthcareProfessional}</td>
                                    <td className="space-x-2">
                                        <Link to={`/dashboard/update-camp/${camp._id}`}>
                                            <button className="btn btn-sm btn-info text-white"><FaEdit /></button>
                                        </Link>
                                        <button onClick={() => handleDelete(camp._id)} className="btn btn-sm btn-error text-white">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageCamps;
