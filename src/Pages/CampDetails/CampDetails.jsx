import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading';

const CampDetails = () => {
  const { campId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: camp, isLoading, refetch } = useQuery({
    queryKey: ['campDetails', campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    }
  });

  const handleJoinCamp = async (e) => {
    e.preventDefault();
    const form = e.target;

    const registrationData = {
      campId,
      campName: camp.campName,
      campFees: camp.fees,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      participantName: user?.displayName,
      participantEmail: user?.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergency.value,
      date: camp.date,
      time: camp.time
    };

    try {
      const res = await axiosSecure.post('/register-camp', registrationData);
      if (res.data.insertedId) {
        await axiosSecure.patch(`/camps/increment/${campId}`); // Update count
        Swal.fire('Success!', 'You have joined the camp.', 'success');
        setIsModalOpen(false);
        refetch();
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to join the camp.', 'error',error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div data-aos='zoom-out' duration='2000' className="max-w-3xl border-t border-gray-300 mx-auto p-6 shadow-lg rounded-2xl my-10">
      <img src={camp.image} alt={camp.campName} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-3xl font-bold mb-2">{camp.campName}</h2>
      <p className="mb-1"><strong>Fees:</strong> ${camp.fees}</p>
      <p className="mb-1"><strong>Date & Time:</strong> {camp.date} at {camp.time}</p>
      <p className="mb-1"><strong>Location:</strong> {camp.location}</p>
      <p className="mb-1"><strong>Doctor:</strong> {camp.healthcareProfessional}</p>
      <p className="mb-1"><strong>Participants:</strong> {camp.participantCount}</p>
      <p className="mb-4"><strong>Description:</strong> {camp.description}</p>

      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Join Camp</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-xl">&times;</button>
            <h3 className="text-xl font-semibold mb-4">Register for Camp</h3>
            <form onSubmit={handleJoinCamp} className="grid grid-cols-1 gap-3">
              <input type="text" value={camp.campName} readOnly className="input input-bordered" />
              <input type="text" value={`$${camp.fees}`} readOnly className="input input-bordered" />
              <input type="text" value={camp.location} readOnly className="input input-bordered" />
              <input type="text" value={camp.healthcareProfessional} readOnly className="input input-bordered" />
              <input type="text" value={user?.displayName} readOnly className="input input-bordered" />
              <input type="email" value={user?.email} readOnly className="input input-bordered" />
              <input type="number" name="age" required placeholder="Your Age" className="input input-bordered" />
              <input type="tel" name="phone" required placeholder="Phone Number" className="input input-bordered" />
              <select name="gender" required className="select select-bordered">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="emergency" required placeholder="Emergency Contact" className="input input-bordered" />
              <button type="submit" className="btn btn-success mt-3">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
