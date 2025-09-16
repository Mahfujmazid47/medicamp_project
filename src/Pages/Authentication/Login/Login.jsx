import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import GoogleLogin from './GoogleLogin';

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = data => {
        const { email, password } = data;
        signIn(email, password)
            .then(async result => {
                const loggedUser = result.user;

                if (loggedUser) {
                    const token = await loggedUser.getIdToken();
                    localStorage.setItem('token', token);

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate(location.state ? location.state : "/");
                }
            })
            .catch(err => {
                console.error(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: err.message
                });
            });
    };

    // 🔑 Prefill handlers
    const fillAdmin = () => {
        setValue("email", "mahfujmazid47@gmail.com");
        setValue("password", "123456");
    };

    const fillDefaultUser = () => {
        setValue("email", "no@man.com");
        setValue("password", "123456");
    };

    return (
        <div data-aos='fade-up' className='md:w-2/3 w-11/12'>
            <div className="">
                <h1 className="text-3xl  text-primary/70 font-extrabold">Join Us </h1>
                <p className="py-3">
                    Login with Medicamp
                </p>
            </div>
            <div className="">
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input md:w-3/4" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                            className="input md:w-3/4" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must have 6 characters</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <input type="submit" value="Login" className='btn  mt-4 md:w-3/4 text-white bg-primary/70 font-semibold rounded border-none shadow-md hover:bg-primary/90 hover:scale-103 transition-transform duration-300 cursor-pointer' />

                        {/* 🔑 Prefill Buttons */}
                        <div className="flex gap-1 mt-3 md:w-3/4">
                            <button type="button" onClick={fillAdmin} className="btn hover:text-white bg-base-100 hover:bg-primary/70 outline-primary/70 btn-sm w-1/2">
                               Login as Admin
                            </button>
                            <button type="button" onClick={fillDefaultUser} className="btn bg-base-100 hover:bg-primary/70 hover:text-white btn-sm w-1/2">
                                Login as User
                            </button>
                        </div>

                        <p className="mt-3">New to this website? <Link to='/auth/register'>
                            <span className='text-primary/70 font-semibold underline cursor-pointer text-sm'>Register</span>
                        </Link></p>

                        <div className='md:w-3/4 mt-2'>
                            <GoogleLogin></GoogleLogin>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
