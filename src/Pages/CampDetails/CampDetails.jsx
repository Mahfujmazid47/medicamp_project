import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useUserRole from '../../Hooks/useUserRole';

const CampDetails = () => {
  const { campId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {role, isRoleLoading} = useUserRole();

  const { data: camp, isLoading } = useQuery({
    queryKey: ['campDetails', campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (registrationData) => {
      return await axiosSecure.post('/register-camp', registrationData);
    }
  });

  const incrementMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/camps/increment/${campId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campDetails', campId]);
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
      organizer_email: camp.email,
      healthcareProfessional: camp.healthcareProfessional,
      participantName: user?.displayName,
      participantEmail: user?.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergency.value,
      date: camp.date,
      time: camp.time,
      joinedTime: new Date().toISOString(),
      payment_status:'unpaid',
      confirmation_status: 'pending',
    };

    try {
      const res = await registerMutation.mutateAsync(registrationData);
      if (res.data.result.insertedId) {
        await incrementMutation.mutateAsync();
        Swal.fire('Success!', 'You have joined the camp.', 'success');
        setIsModalOpen(false);
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to join the camp.', 'error',error);
    }
  };

  if (isLoading || isRoleLoading) return <Loading />;

  return (
    <div data-aos='zoom-out' duration='2000' className="max-w-3xl border-t border-gray-300 mx-auto p-6 shadow-lg rounded-2xl my-10">
      <img src={camp.image} alt={camp.campName} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-3xl font-bold mb-2">{camp.campName}</h2>
      <p className="mb-1"><strong>Fees:</strong> ${camp.fees}</p>
      <p className="mb-1"><strong>Date & Time:</strong> {camp.date} at {camp.time}</p>
      <p className="mb-1"><strong>Location:</strong> {camp.location}</p>
      <p className="mb-1"><strong>Doctor:</strong> {camp.healthcareProfessional}</p>
      <p className="mb-1"><strong>Organizer Email:</strong> {camp.email}</p>
      <p><strong>Participants: <span className='badge badge-primary'>{camp.participantCount}</span></strong></p>
      <p className="mb-4"><strong>Description:</strong> {camp.description}</p>

      <button onClick={() => setIsModalOpen(true)} disabled={role === 'organizer'} className="btn btn-primary">{role === 'participant' ? 'Join Camp' : 'Organizer Cannot Join'}</button>

      {/* Modal with Headless UI */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Register for Camp
                  </Dialog.Title>
                  <form onSubmit={handleJoinCamp} className="mt-4 grid grid-cols-1 gap-3">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CampDetails;
