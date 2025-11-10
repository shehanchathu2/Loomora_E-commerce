import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import image1 from "../assets/image1.jpg";


const Login = () => {

  const [currectState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      if (currectState === 'Sign Up') {
        const res = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        console.log(res.data)
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success("Registration successful");
        } else {
          toast.error("Invalid details");
        }
      } else {
        const res = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success("Login successful");
        } else {
          toast.error(res.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error("Error occurred during authentication");
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 mt-10">

      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-lg"
        style={{
          backgroundImage: `url(${image1})`,
        }}
      ></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>


          <div className="flex items-center justify-center mb-8">

            <h2 className="mx-4 text-4xl font-bold text-gray-800">
              {currectState === "Login" ? "Login" : "Sign Up"}
            </h2>

          </div>



          <form onSubmit={onSubmitHandler} className="space-y-6">
            {currectState === 'Sign Up' && (
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 focus:border-purple-600 outline-none transition-colors bg-transparent"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 focus:border-blue-600 outline-none transition-colors bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 focus:border-blue-600 outline-none transition-colors bg-transparent"
                  required
                />
              </div>
            </div>


            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 w-4 h-4 accent-blue-600" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {currectState === 'Login' ? 'LOGIN' : 'SIGN UP'}
            </button>
          </form>


          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>


          <div className="text-center">
            <p className="text-gray-600 text-sm">
              {currectState === 'Login' ? "Not a member?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setCurrentState(currectState === 'Login' ? 'Sign Up' : 'Login')}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                {currectState === 'Login' ? 'Signup Now' : 'Login Now'}
              </button>
            </p>
          </div>
        </div>


        <div className="text-center mt-6">
          <h1 className="text-white text-2xl font-bold tracking-wide">MONAVO</h1>
          <p className="text-purple-200 text-sm tracking-widest">MEN'S FASHION</p>
        </div>
      </div>
    </div>
  )
}

export default Login