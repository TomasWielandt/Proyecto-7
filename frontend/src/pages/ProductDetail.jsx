import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';
import PropTypes from 'prop-types';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);
  
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/readone/${productId}`);
        console.log(response.data);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    alert(`${product.name} ha sido agregado al carrito!`);
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h2 className="text-3xl mb-4">{product.name}</h2>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full max-w-lg h-auto object-contain mb-4"
      />
      <p className="mb-4">{product.description}</p>
      <p className="font-bold text-xl mb-4">Precio: ${product.price}</p>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={addToCart}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

ProductDetail.propTypes = {
  productId: PropTypes.string
};

export default ProductDetail;
