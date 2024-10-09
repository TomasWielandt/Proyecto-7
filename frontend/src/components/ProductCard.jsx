import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
      <h3 className="text-lg">{product.name}</h3>
      <p>{product.description}</p>
      <Link to={`/product/${product._id}`} className="text-blue-500">Ver detalles</Link>
    </div>
  );
};

export default ProductCard;
