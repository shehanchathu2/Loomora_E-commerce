import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {useSearchParams} from 'react-router-dom'
import { backendUrl } from '../../../adminPanel/src/App'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect } from 'react'

const VerifyPayment = () => {

  const {navigate , token , setCartItem ,backendUrl} = useContext(ShopContext)

  const [searchParam, setSearchparam] = useSearchParams()
  
  const success = searchParam.get('success')
  const orderId = searchParam.get('orderId')
  console.log("success:",success)
  console.log("orderId:",orderId)

  const verifyPayment = async () => {
    try {
      
      if (!token) {
        return;
      }


      const res = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })
      console.log("verify page : ",token)
      if (res.data.success) {
        setCartItem({})
        navigate('/order')
        toast.success("payment success")
      } else {
        navigate('/cart')
        toast.error("payment failed")
      }

    } catch (error) {
      console.log(error)
      toast.error("payment failed")
    }
  }

  useEffect(() => {
    verifyPayment()
  },[token])

  return (
    <div>
      
    </div>
  )
}

export default VerifyPayment
