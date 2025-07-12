import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const campData = {
      campName: data.campName,
      image: data.image,
      campFees: parseFloat(data.campFees),
      dateTime: data.dateTime,
      location: data.location,
      healthcareProfessional: data.healthcareProfessional,
      participantCount: 0, // Default
      description: data.description,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/camps`, campData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Camp Added Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: err.message
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Add a Medical Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Camp Name */}
        <div>
          <label className="block mb-1 font-medium">Camp Name</label>
          <input
            type="text"
            {...register('campName', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.campName && <span className="text-red-500 text-sm">Camp name is required</span>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            {...register('image', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.image && <span className="text-red-500 text-sm">Image URL is required</span>}
        </div>

        {/* Camp Fees */}
        <div>
          <label className="block mb-1 font-medium">Camp Fees (৳)</label>
          <input
            type="number"
            step="0.01"
            {...register('campFees', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.campFees && <span className="text-red-500 text-sm">Camp fee is required</span>}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block mb-1 font-medium">Date & Time</label>
          <input
            type="datetime-local"
            {...register('dateTime', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.dateTime && <span className="text-red-500 text-sm">Date & Time is required</span>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register('location', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.location && <span className="text-red-500 text-sm">Location is required</span>}
        </div>

        {/* Healthcare Professional */}
        <div>
          <label className="block mb-1 font-medium">Healthcare Professional Name</label>
          <input
            type="text"
            {...register('healthcareProfessional', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.healthcareProfessional && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Camp Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
          {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full md:w-1/2">Add Camp</button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
