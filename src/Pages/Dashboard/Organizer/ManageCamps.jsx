import React, { useMemo, useState } from 'react';
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

    // for pagination and search --> 
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;






    // 🔹 Load camps created by this organizer
    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['myCamps', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/organizer-camps?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });



    // 🔍 Filtered camps by search
    const filteredCamps = useMemo(() => {
        return camps.filter(camp =>
            camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            camp.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            camp.healthcareProfessional.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, camps]);

    // 🔢 Paginated data
    const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
    const paginatedCamps = filteredCamps.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );



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

    if (isLoading){
        return <Loading />
    }

    if (camps.length < 1) {
        return <NoCamps />
    }

    return (
        <div data-aos='zoom-out' duration='2000' className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Your Camps</h2>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name, date, professional..."
                    className="input input-bordered w-full md:w-1/2"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            {/* table table-zebra w-full text-sm md:text-base */}

                <div className="overflow-x-auto">
                    <table className="table table-zebra text-xs sm:text-sm md:text-base ">
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
                            {paginatedCamps.map((camp, index) => (
                                <tr key={camp._id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{camp.campName}</td>
                                    <td>{camp.date}</td>
                                    <td>{camp.location}</td>
                                    <td>{camp.healthcareProfessional}</td>
                                    <td className="flex flex-wrap gap-2">
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

        </div>
    );
};

export default ManageCamps;
