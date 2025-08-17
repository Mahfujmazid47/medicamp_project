import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading';

const UpdateCamp = () => {
    const { campId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // 🔹 Fetch camp data by ID
    const { data: campData, isLoading } = useQuery({
        queryKey: ['campById', campId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camps/${campId}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (campData) {
            reset(campData);
        }
    }, [campData, reset]);

    // 🔹 Mutation for update
    const mutation = useMutation({
        mutationFn: async (updatedCamp) => {
            const res = await axiosSecure.put(`/update-camp/${campId}`, updatedCamp);
            // console.log(res.data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myCamps']);
            Swal.fire('Updated!', 'Camp information updated successfully!', 'success');
            navigate('/dashboard/manage-camps');
        },
        onError: (error) => {
            Swal.fire('Error', 'Failed to update camp.', 'error', error);
        },
    });

    const onSubmit = (data) => {
        const { _id, ...updatedCamp } = data;
        mutation.mutate(updatedCamp);
    };

    if (isLoading) return <Loading />;

    return (
        <div data-aos='zoom-out' duration='2000' className="max-w-4xl mx-auto p-6 rounded-lg mt-8 bg-gradient-to-br from-blue-50 to-purple-100 shadow-2xl border border-blue-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Update Camp</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                    <label>Camp Name</label>
                    <input {...register("campName", { required: true })} className="input input-bordered w-full" />
                    {errors.campName && <p className="text-red-500">Camp Name is required</p>}
                </div>

                <div>
                    <label>Image URL</label>
                    <input {...register("image", { required: true })} className="input input-bordered w-full" />
                    {errors.image && <p className="text-red-500">Image URL is required</p>}
                </div>

                <div>
                    <label>Camp Fees (৳)</label>
                    <input type="number" {...register("fees", { required: true })} className="input input-bordered w-full" />
                    {errors.fees && <p className="text-red-500">Fees is required</p>}
                </div>

                <div>
                    <label>Date</label>
                    <input type="date" {...register("date", { required: true })} className="input input-bordered w-full" />
                    {errors.date && <p className="text-red-500">Date is required</p>}
                </div>

                <div>
                    <label>Time</label>
                    <input type="time" {...register("time", { required: true })} className="input input-bordered w-full" />
                    {errors.time && <p className="text-red-500">Time is required</p>}
                </div>

                <div>
                    <label>Location</label>
                    <input {...register("location", { required: true })} className="input input-bordered w-full" />
                    {errors.location && <p className="text-red-500">Location is required</p>}
                </div>

                <div className="md:col-span-2">
                    <label>Healthcare Professional Name</label>
                    <input {...register("healthcareProfessional", { required: true })} className="input input-bordered w-full" />
                    {errors.healthcareProfessional && <p className="text-red-500">Professional name is required</p>}
                </div>

                <div className="md:col-span-2">
                    <label>Description</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" />
                    {errors.description && <p className="text-red-500">Description is required</p>}
                </div>

                <div className="md:col-span-2 text-center">
                    <input type="submit" value="Update Camp" className="btn bg-primary/70 text-white w-1/2" />
                </div>
            </form>
        </div>

    );
};

export default UpdateCamp;
