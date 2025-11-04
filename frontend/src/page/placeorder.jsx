import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import TotalPrice from '../components/TotalPrice'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'
import axios from "axios";

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, cartItem, setCartItem, getCartTotal, deliveryCharge, products ,token} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipecode: '',
    country: '',
    phone: ''
  })


  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [name]: value }))
  }

  const submitHandller = async (e) => {
        e.preventDefault();


    try {

      let orderItem = []

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItem.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItem,
        amount:getCartTotal()+deliveryCharge
      }

      switch (method) {
        case 'cod':
          console.log(token)
          const res = await axios.post(backendUrl + '/api/order/placeorder', orderData, {headers: {token }})
          console.log(res.data)
          if (res.data.success) {
            setCartItem({})
            navigate('/order')
          } else {
            toast.error("failed")
          }
          break;
        case 'stripe':
          const stripeRes = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (stripeRes.data.success) {
            window.location.replace(stripeRes.data.url)
          } else {
            console.log(error)
            toast.error("failed")
          }
          break;

        default:
          break;
      }



    } catch (error) {
      console.log(error)
    }

  }


  return (
    <form onSubmit={submitHandller} className="flex flex-col justify-between mt-10 sm:flex-row gap-10 pt-10 sm:pt-16 min-h-[80vh] px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 bg-white">

      {/* Delivery Info */}
      <div className="flex flex-col gap-5 w-full sm:max-w-[420px] bg-gray-50 p-6 rounded-2xl shadow-sm">
        <div className="text-center sm:text-left">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input required onChange={onchangeHandler} name='firstName' value={formData.firstName} className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="text" placeholder="First Name" />
          <input required onChange={onchangeHandler} value={formData.lastName} name='lastName' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onchangeHandler} value={formData.email} name='email' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="email" placeholder="Email" />
        <input required onChange={onchangeHandler} value={formData.street} name='street' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onchangeHandler} value={formData.city} name='city' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="text" placeholder="City" />
          <input required onChange={onchangeHandler} value={formData.state} name='state' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onchangeHandler} value={formData.zipecode} name='zipecode' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="number" placeholder="Postal Code" />
          <input required onChange={onchangeHandler} value={formData.country} name='country' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="text" placeholder="Country" />
        </div>
        <input required onChange={onchangeHandler} value={formData.phone} name='phone' className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none px-3 py-2 w-full rounded-md text-sm" type="number" placeholder="Phone Number" />
      </div>

      {/* Summary + Payment */}
      <div className="flex flex-col gap-10 w-full sm:w-auto">
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <TotalPrice />
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-4 flex-col lg:flex-row mt-4">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border border-gray-300 hover:border-gray-500 p-3 px-4 rounded-md cursor-pointer transition">
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method == 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="Stripe" />
            </div>

            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border border-gray-300 hover:border-gray-500 p-3 px-4 rounded-md cursor-pointer transition">
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method == 'razorpay' ? 'bg-green-500' : ''}`} ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="Razorpay" />
            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-300 hover:border-gray-500 p-3 px-4 rounded-md cursor-pointer transition">
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method == 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className="text-gray-600 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end">
            <button type='submit' className="mt-6 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors duration-300">PLACE ORDERT</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
