import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    dispatch(createProduct(productData));
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold my-4'>Product Management</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleInputChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleInputChange}
            rows='3'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          ></textarea>
        </div>
        <div>
          <label
            htmlFor='price'
            className='block text-sm font-medium text-gray-700'
          >
            Price
          </label>
          <input
            type='number'
            name='price'
            id='price'
            value={formData.price}
            onChange={handleInputChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='stockQuantity'
            className='block text-sm font-medium text-gray-700'
          >
            Stock Quantity
          </label>
          <input
            type='number'
            name='stockQuantity'
            id='stockQuantity'
            value={formData.stockQuantity}
            onChange={handleInputChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='categoryId'
            className='block text-sm font-medium text-gray-700'
          >
            Category
          </label>
          <select
            name='categoryId'
            id='categoryId'
            value={formData.categoryId}
            onChange={handleInputChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value=''>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700'
          >
            Image
          </label>
          <input
            type='file'
            name='image'
            id='image'
            onChange={handleImageChange}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            {isLoading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
      <div className='mt-8'>
        <h3 className='text-xl font-bold mb-4'>Product List</h3>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <div key={product.id} className='border rounded-lg p-4'>
              <h4 className='text-lg font-semibold'>{product.name}</h4>
              <p className='text-gray-600'>{product.description}</p>
              <p className='text-indigo-600 font-bold mt-2'>${product.price}</p>
              <p className='text-sm text-gray-500'>
                Stock: {product.stockQuantity}
              </p>
              <div className='mt-4 flex justify-end space-x-2'>
                <button
                  onClick={() =>
                    dispatch(
                      updateProduct(product.id, {
                        ...product,
                        price: product.price + 1,
                      })
                    )
                  }
                  className='px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteProduct(product.id))}
                  className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
