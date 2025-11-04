import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'


const TopProducts = () => {

    const { products } = useContext(ShopContext)
    const [topProducts, setTopProducts] = useState([])

    useEffect(() => {
        const filtered = products.filter((item) => item.bestseller)
        setTopProducts(filtered.slice(0, 5));
    }, [products])

    console.log(topProducts)
    return (
        <div className='my-10 mx-4 md:mx-8 lg:mx-12'>
            <div className='text-center text-3xl py-8'>
                <Title text1={"TOP"} text2={" PRODUCTS"} />
                <p className=' w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore our top products, handpicked for quality and popularity.
                </p>
            </div>

           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-8 lg:px-20">
  {topProducts.map((item, index) => (
    <ProductItem
      key={index}
      id={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
    />
  ))}
</div>

        </div>
    )
}

export default TopProducts
