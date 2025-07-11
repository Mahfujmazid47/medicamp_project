import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import GoogleRegister from './GoogleRegister';

const Registration = () => {
    const { createUser, userProfileUpdate } = useAuth();
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = data => {
        console.log(data);
        const { email, password } = data;
        createUser(email, password)
            .then(async (result) => {
                console.log(result.user);

                Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')

                // update user info in firebase
                const profileInfo = {
                    displayName: data.name,
                    photoURL: data.photo,
                }
                userProfileUpdate(profileInfo)
                    .then(() => {
                        console.log('Name and Pic uploaded')
                    })
                    .catch(error =>
                        console.log(error)
                    )

                //update user info in database 
                // const userInfo = {
                //     email: email,
                //     role: 'user',// default role
                //     created_at: new Date().toISOString(),
                //     last_log_in: new Date().toISOString(),
                // };
                // const userResponse = await axiosInstance.post('/users', userInfo);
                // console.log(userResponse.data);
                // if (userResponse.data.insertedId) {
                //     Swal.fire({
                //         position: "center",
                //         icon: "success",
                //         title: "Registration Successful",
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                //     navigate('/');
                // }
            })
            .catch(error => {
                console.error(error);
            })
    }



    return (
        <div data-aos='zoom-out' duration='2000' className='md:w-2/3 w-11/12'>
            <div className="">
                <h1 className="text-3xl font-extrabold">Create an Account</h1>
                <p className="py-3">
                    Register with MediCamp
                </p>
            </div>
            <div>

            </div>
            <div className="">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
            

                        <label className="label">Name</label>
                        <input type="name" {...register('name', { required: true })} className="input md:w-3/4" placeholder="Your Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>name is required</p>
                        }
                        
                        <label className="label">Photo URL</label>
                        <input type="photo" {...register('photo', { required: true })} className="input md:w-3/4" placeholder="Your Photo URL" />
                        {
                            errors.photo?.type === 'required' && <p className='text-red-500'>Photo URL is required</p>
                        }

                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input md:w-3/4" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                            className="input md:w-3/4" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must have 6 characters</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <input type="submit" value="Register" className='btn btn-primary text-white hover:scale-105 transition-all mt-4 md:w-3/4' />

                        <p>Already have an account? <Link to='/auth/login'>
                            <span className='text-primary font-semibold underline cursor-pointer text-sm'>Login</span>
                        </Link></p>

                        <div className='md:w-3/4'>
                            <GoogleRegister></GoogleRegister>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;