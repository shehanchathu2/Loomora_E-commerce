import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const TotalPrice = () => {

    const { currency, getCartTotal, deliveryCharge } = useContext(ShopContext)
    return (
        <div className='w-full '>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{getCartTotal()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between' >
                    <p>Delivery Charge</p>
                    <p>{currency}{deliveryCharge}.00</p>
                </div>
                <hr />  
                <div className='flex justify-between font-bold'>
                    <p>Total</p>
                    <p>{currency}{getCartTotal() + deliveryCharge}.00</p>
                </div>
            </div>
        </div>
    )
}

export default TotalPrice
