import { Mail, Lock, Shield } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });

    try {
      const res = await axios.post(backendUrl + '/api/user/admin', {
        email,
        password,
      });

        if (res.data.success) {
            setToken(res.data.token);
            toast.success("Login successfully")
        } else {
            toast.error(res.data.message)
        }
      
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message)
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg mb-4'>
            <Shield className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Admin Panel</h1>
          <p className='text-gray-600'>Sign in to manage your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
            {/* Email Field */}
            <div className='mb-6'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='admin@loomora.com'
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='mb-6'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className='text-center text-sm text-gray-500 mt-6'>
          © 2025 Loomora. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;