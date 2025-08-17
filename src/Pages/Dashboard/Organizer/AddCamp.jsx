import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const AddCamp = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const campInfo = {
      email : user.email,
      campName: data.campName,
      image: data.image,
      fees: parseFloat(data.fees),
      date: data.date,
      time: data.time,
      location: data.location,
      healthcareProfessional: data.healthcareProfessional,
      description: data.description,
      participantCount: 0,
    };

    try {
      // console.log("Sending camp data:", campInfo);
      const res = await axiosSecure.post('/camps', campInfo);
      // console.log("Response:", res.status, res.data);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Camp added successfully!', 'success');
        reset();
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', "error", error);
    }
  };

  return (
    <div data-aos='zoom-out' duration='2000' className="max-w-4xl mx-auto p-6 rounded-lg mt-8 bg-gradient-to-br from-primary/40 to-secondary/20 shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary/70">Add a New Camp</h2>
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
          <input type="submit" value="Add Camp" className="btn border-none text-white bg-primary/70 w-1/2" />
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
