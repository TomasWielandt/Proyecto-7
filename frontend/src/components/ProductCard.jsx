import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      {/* Mostrar la imagen utilizando imageUrl */}
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-80 object-contain" // Aumentamos la altura a 'h-80' para mejorar proporciones
        />
      )}
      <h3 className="text-lg mt-4">{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product._id}`} className="text-blue-500">Ver detalles</Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string, // Aseguramos que se use imageUrl
  }).isRequired
};

export default ProductCard;
