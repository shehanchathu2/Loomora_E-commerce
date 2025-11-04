import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import About from './page/about'
import Cart from './page/cart'
import Collection from './page/collection'
import Contact from './page/contact'
import Login from './page/Login'
import Order from './page/order'
import Placeorder from './page/placeorder'
import VerifyPayment from './page/VerifyPayment'
import Product from './page/product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (

    <div>
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: '#333', color: '#fff' },
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<Order />} />
        <Route path='/placeorder' element={<Placeorder />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/verify' element={<VerifyPayment/>} />

      </Routes>
      <Footer />
    </div>

  )
}

export default App