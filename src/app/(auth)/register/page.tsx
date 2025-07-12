'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from '@/utils/axios';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const { data: session } = useSession();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  useEffect(() => {
    if (session?.user) router.replace('/dashboard/notes');
  }, [session, router]);

  const onSubmit = async (data: RegisterForm) => {
    try {
      await axios.post('/auth/register', data);
      router.push('/login');
    } catch (err: any) {
      setServerError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {serverError && <p className="text-red-600">{serverError}</p>}

          <button type="submit" className="btn btn-primary w-full">Create Account</button>
        </form>
      </div>
    </div>
  );
}
