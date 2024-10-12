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
    // Verificar si el producto tiene stock
    if (product.stock > 0) {
      // Si hay stock, agregar el producto al carrito
      dispatch({ type: 'ADD_ITEM', payload: product });
      alert(`${product.name} ha sido agregado al carrito!`);
    } else {
      // Si no hay stock, mostrar alerta
      alert('Producto no disponible');
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md w-full max-w-lg transition-transform transform hover:shadow-xl">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-auto object-contain mb-4"
        />
        <p className="mb-4">{product.description}</p>
        <p className="font-bold text-xl mb-4">Precio: ${product.price}</p>
        <p className="font-bold text-lg mb-4">Stock: {product.stock}</p> {/* Mostrar el stock actual */}
        {/* Botón para agregar al carrito */}
        <button 
          className="p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
          onClick={addToCart}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  productId: PropTypes.string
};

export default ProductDetail;
