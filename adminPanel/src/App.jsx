import React, { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Addproduct from './pages/Addproduct'
import { Routes, Route } from 'react-router-dom'
import Allproducts from './pages/Allproducts'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  return (

    <>
      <ToastContainer />
      {token === ''
        ? <Login setToken={setToken} />
        :
        <div className="flex min-h-screen">

          <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-md z-50">
            <Navbar setToken={setToken} />
          </div>

          <div className="flex-1 ml-64 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard token={token} />} />
              <Route path="/addproduct" element={<Addproduct token={token} />} />
              <Route path="/allproduct" element={<Allproducts token={token} />} />
              <Route path="/order" element={<Order token={token} />} />
            </Routes>
          </div>
        </div>
      }
    </>

  )
}

export default App
