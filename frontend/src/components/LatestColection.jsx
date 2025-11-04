import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestColection = () => {

    const {products} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
       setLatestProducts(products.slice(0,12)); 
    },[products])
  return (
      <div className='my-10 mx-4 md:mx-8 lg:mx-12'>
          <div className='text-center py-8 text-3xl'>
              <Title text1={"NEW"} text2={" ARRIVALS"} />
              <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Discover the latest trends and styles in our new collection.</p>
          </div>

          {/* show latest products here */}
          <div className='grid grid-cols-2 mx-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 lg:mx-20'>
              {
                  latestProducts.map((item,index) => (
                          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                  ))
              }
          </div>
    </div>
  )
}

export default LatestColection
