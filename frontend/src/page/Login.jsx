import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

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
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 mb-20' action="">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currectState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>


      {currectState == 'Login' ? '' : <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" className="w-full px-3 py-2 border border-gray-800 " required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-800 " required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-800 " required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot password</p>
        {
          currectState === 'Login'
            ? <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p>
            : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currectState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login
