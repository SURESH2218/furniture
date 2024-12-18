import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.wishlist);

  if (isLoading) return <div>Loading wishlist...</div>;
  if (error) return <div className='text-red-500'>{error}</div>;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold my-4'>My Wishlist</h2>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => (
            <div key={item.id} className='border rounded-lg p-4'>
              <img
                src={item.image}
                alt={item.name}
                className='w-full h-48 object-cover mb-4'
              />
              <h3 className='text-lg font-semibold'>{item.name}</h3>
              <p className='text-gray-600'>{item.description}</p>
              <p className='text-indigo-600 font-bold mt-2'>
                ${item.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.id)}
                className='mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200'
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
