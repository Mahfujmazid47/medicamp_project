import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

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
      const res = await axiosSecure.post('/users', updatedInfo);
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
    };
    mutation.mutate(updatedUser);
  };

  // ✅ Fill form with existing data when entering edit mode
  const handleEditClick = () => {
    reset({
      name: userData?.name || '',
      photoURL: userData?.photoURL || '',
      phone: userData?.phone || ''
    });
    setEditMode(true);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Organizer Profile</h2>

      {!editMode ? (
        <div className="space-y-4 text-lg">
          <div><strong>Name:</strong> {userData?.name || 'N/A'}</div>
          <div><strong>Email:</strong> {userData?.email}</div>
          <div><strong>Phone:</strong> {userData?.phone || 'N/A'}</div>
          <div>
            <strong>Photo:</strong><br />
            {userData?.photoURL ? (
              <img src={userData.photoURL} alt="Profile" className="w-24 h-24 rounded-full mt-2" />
            ) : 'N/A'}
          </div>

          <button onClick={handleEditClick} className="btn btn-primary mt-4">Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input {...register('name')} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Photo URL</label>
            <input {...register('photoURL')} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input {...register('phone')} className="input input-bordered w-full" />
          </div>

          <div className="flex gap-4">
            <input type="submit" value="Update" className="btn btn-success" />
            <button onClick={() => setEditMode(false)} type="button" className="btn btn-error">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrganizerProfile;
