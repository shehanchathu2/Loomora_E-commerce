import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const order = () => {

  const { products, currency, token, backendUrl } = useContext(ShopContext)

  const [orderdata, setOrderdata] = useState([])

  const getOrderdata = async () => {
    try {

      const res = await axios.post(
        backendUrl + '/api/order/userOrders',
        {},
        { headers: { token } }  
      )
      if (res.data.success) {
        let allOrderItem = []
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItem.push(item)
          })
        })
        setOrderdata(allOrderItem.reverse())
        console.log(allOrderItem)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrderdata()
  }, [token])

  return (
    <div className="mt-10 border-t-2 pt-10 transition-opacity ease-out duration-500 opacity-100 my-10 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
      <div className='flex justify-start text-2xl'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>

      <div>
        {
          orderdata.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-28' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 text-base text-gray-500'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quntity : {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2'>Date : <samp className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</samp></p>
                  <p className='mt-2'>{ item.paymentMethod}</p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                  <p className='text-sm md:text-bace'>{ item.status}</p>
                </div>
                <button onClick={getOrderdata} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default order
