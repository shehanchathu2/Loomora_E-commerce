import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-800 cursor-pointer block group"
    >
      {/* Image Container */}
      <div className="w-full h-64 overflow-hidden border border-gray-300 rounded-lg bg-gray-50">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <p className="text-sm sm:text-base font-medium truncate">{name}</p>
        <p className="text-lg font-semibold text-gray-900">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
