import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  setProducts,
  setLoading,
  setError,
} from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.get(
          'http://localhost:3000/product/products'
        );
        dispatch(setProducts(data.data));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message || 'Failed to fetch products'));
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='text-center py-2'>Products List</h1>
      <div className='rounded-md bg-slate-950 z-40 w-[90%] h-full border mx-auto'>
        <ul className='grid grid-cols-3 gap-4 p-2'>
          {products?.map((product) => (
            <li
              key={product.id}
              className='bg-white text-black p-3 border-2 rounded-md'
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <p>{product.name}</p>
              <p>{product.description}</p>
              {product?.images?.map((image) => (
                <div key={image.id}>
                  <img
                    src={image.imageUrl}
                    alt='Product image'
                    className='p-3 border-black'
                  />
                  <p>Is Primary: {image.isPrimary ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
