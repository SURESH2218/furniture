import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  console.log(product);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock Quantity: {product.stockQuantity}</p>

      {product?.images?.map((image) => (
        <div key={image.id}>
          <img src={image.imageUrl} alt='Product Image' />
          <p>Is Primary: {image.isPrimary ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
