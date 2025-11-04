// file: src/pages/Product.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="mt-10 border-t-2 pt-10 transition-opacity ease-out duration-500 opacity-100 my-10 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-14 bg-white">
        {/* Left side - Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18%] w-full gap-3 p-1">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt=""
                className={`cursor-pointer w-[60%] sm:w-full rounded-sm border hover:scale-105 transition-transform duration-200 ${image === item ? 'border-blue-400' : 'border-gray-200'
                  }`}
              />
            ))}
          </div>
          <div className="flexr items-center w-full sm:w-[82%] p-2">
            <img src={image} alt="" className="w-full h-auto " />
          </div>
        </div>

        {/* Right side - Details */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">{productData.name}</h2>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-4 h-4" />
            ))}
            <p className="pl-2 text-gray-600">(122 reviews)</p>
          </div>

          <p className="text-2xl font-semibold text-gray-900">
            {currency} {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/3'>
            {productData.description || ''}
          </p>
          <div className='flex flex-col gap4 my-8'>
            <p className=''>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'bg-gray-800 text-white' : 'border-transparent'}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add To Cart</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className="mt-8 text-sm">
            <div className="bg-gray-50 border border-gray-200 p-5 shadow-sm">
              <h3 className="text-gray-800 font-semibold mb-3 text-base">Why shop with us?</h3>

              <ul className="flex flex-col gap-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span>100% original products guaranteed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Free delivery on orders above {currency} 500</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Easy 30-day returns and exchanges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>Try & Buy available in select cities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200">
          <button className="px-6 py-3 text-sm font-medium text-gray-800 border-b-2 border-blue-500">
            Description
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-300 transition">
            Reviews (169)
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-gray-50 rounded-b-xl border border-t-0 border-gray-200 text-sm text-gray-700 leading-relaxed">
          <p>
            Our products are crafted with quality materials and undergo rigorous testing
            to ensure durability and comfort. You’ll enjoy both style and reliability in every use.
          </p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="mt-20 text-center text-lg text-gray-500">Loading...</div>
  );
};

export default Product;
