import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Importa el hook useParams
import CartContext from '../context/CartContext';
import PropTypes from 'prop-types';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(CartContext);
  
  // Obtén el ID del producto desde la URL usando useParams
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // console.log(`Fetching product with ID: ${productId}`); // Verifica si productId es correcto

        const response = await axios.get(`/api/products/readone/${productId}`);
        console.log(response.data); // Verifica los datos del producto
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <p>{product.description}</p>
      <p className="font-bold">Precio: ${product.price}</p>
      <button 
        className="bg-blue-500 text-white p-2 mt-4"
        onClick={addToCart}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

// PropTypes ya no requiere match, así que eliminamos esa validación
ProductDetail.propTypes = {
  productId: PropTypes.string // Si quisieras validar algún prop, podrías agregarlo aquí.
};

export default ProductDetail;
