import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../services/auth.js';
import { login } from '../store/authSlice.js';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState("");

  const signup = async (data) => {
    setError("");
    try {
      const CreateAccount = await authService.createAccount(data);
      if (CreateAccount) {
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
        <h2 className="text-center text-2xl font-bold text-white mb-2">Sign up to create account</h2>
        <p className="mb-6 text-center text-base text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-400 hover:underline">Sign In</Link>
        </p>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register('name', { required: true, minLength: 3 })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true, minLength: 6 })}
            />
            <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;