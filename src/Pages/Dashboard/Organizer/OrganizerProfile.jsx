import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Shared/Loading';

const OrganizerProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);

    // ✅ Fetch user profile data
    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data.find(u => u.email === user?.email);
        },
        enabled: !!user?.email
    });

    // ✅ React Hook Form
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            photoURL: '',
            phone: ''
        }
    });

    // ✅ Update mutation
    const mutation = useMutation({
        mutationFn: async updatedInfo => {
            const res = await axiosSecure.put('/users/update-profile', updatedInfo);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userProfile']);
            Swal.fire('Success', 'Profile Updated!', 'success');
            setEditMode(false);
        },
        onError: () => {
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    });

    // ✅ Submit handler
    const onSubmit = data => {
        const updatedUser = {
            ...userData,
            name: data.name,
            photoURL: data.photoURL,
            phone: data.phone,
            address: data.address,
        };
        mutation.mutate(updatedUser);
    };

    // ✅ Fill form with existing data when entering edit mode
    const handleEditClick = () => {
        reset({
            name: userData?.name || '',
            photoURL: userData?.photoURL || '',
            phone: userData?.phone || '',
            address: userData?.address || ''
        });
        setEditMode(true);
    };

    if (isLoading) return <Loading />;

    return (
        <div data-aos='zoom-out' duration='2000' className="w-11/12 md:w-6/12 min-h-[80vh] mx-auto my-16 p-8 bg-gradient-to-br from-primary/40 to-secondary/20 shadow-2xl rounded-2xl flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-10 text-center text-primary/70">My Profile</h2>

            {!editMode ? (
                <div className="space-y-8 text-base">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={userData?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                        <h3 className="text-2xl font-semibold mt-4">{userData?.name || 'N/A'}</h3>
                        <p className=" mt-1">{userData?.email}</p>
                        <p className=" mt-1">📞 {userData?.phone || 'N/A'}</p>
                        <p className=" mt-1">🏠 {userData?.address || 'N/A'}</p>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleEditClick}
                            className="btn btn-primary bg-primary/70 border-none text-white px-8 py-3 rounded-lg shadow-md transition-transform hover:scale-105"
                        >
                            ✏️ Edit Profile
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            {...register('name')}
                            placeholder="Enter your full name"
                            className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Photo URL</label>
                        <input
                            {...register('photoURL')}
                            placeholder="Enter your image URL"
                            className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Phone</label>
                        <input
                            {...register('phone')}
                            placeholder="Enter your phone number"
                            className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Address</label>
                        <input
                            {...register('address')}
                            placeholder="Enter your full address"
                            className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <input
                            type="submit"
                            value="✅ Update"
                            className="btn bg-green-600 text-white hover:bg-green-700 transition px-8 py-2"
                        />
                        <button
                            onClick={() => setEditMode(false)}
                            type="button"
                            className="btn bg-red-500 text-white hover:bg-red-600 transition px-8 py-2"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>


    );
};

export default OrganizerProfile;
