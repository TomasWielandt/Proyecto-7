import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
      <h3 className="text-lg">{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product._id}`} className="text-blue-500">Ver detalles</Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,         // El ID del producto es requerido y debe ser una cadena
    name: PropTypes.string.isRequired,        // El nombre del producto es requerido
    price: PropTypes.number.isRequired, // La descripción del producto es requerida
    image: PropTypes.string,  // Ahora 'image' es opcional
  }).isRequired
};

export default ProductCard;
