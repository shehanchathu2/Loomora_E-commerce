import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext)
    return (

        <Link
            className='text-gray-700 cursor-pointer'
            to={`/product/${id}`}
        >
            <div className='overflow-hidden border border-gray-400 '>
                <img
                    src={image[0]}
                    alt=""
                    className="hover:scale-110 transition ease-in-out duration-300 w-full"
                />
            </div>

            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-lg font-bold'>{currency} {price}</p>
        </Link>
    )
}

export default ProductItem
