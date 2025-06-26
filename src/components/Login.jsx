import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../services/auth.js';
import { login } from '../store/authSlice.js';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState("");

  const onSubmit = async (data) => {
    // console.log("Login data which we pass through form : ", data);
    setError("");
    try {
      const session = await authService.login(data);
      // if we get seesion then user is logged in otherwise not.
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="mx-auto w-full max-w-md bg-gray-900 rounded-2xl p-10 shadow-2xl border border-gray-800">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-white mb-2">Sign in to your account</h2>
        <p className="mb-6 text-center text-base text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-400 hover:underline">Sign Up</Link>
        </p>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true, minLength: 6 })}
            />
            <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;