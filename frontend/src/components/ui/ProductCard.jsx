import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
        <p className='text-gray-600 mb-2'>{product.description}</p>
        <p className='text-indigo-600 font-bold'>${product.price.toFixed(2)}</p>
        <div className='mt-4 flex justify-between'>
          <Link
            to={`/product/${product.id}`}
            className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300'
          >
            View Details
          </Link>
          <button
            onClick={handleAddToWishlist}
            className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300'
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
