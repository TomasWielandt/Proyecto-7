import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductOnSale = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/readall`);
        if (response.data.products.length > 0) {
          setProduct(response.data.products[0]); // Mostrar solo el primer producto
        }
      } catch (error) {
        console.error('Error al obtener el producto en oferta:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <p>Cargando producto en oferta...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto en oferta.</p>;
  }

  return (
    <div className="border border-gray-300 p-6 mt-4 rounded shadow-lg bg-white flex flex-col items-center transition-shadow duration-300 hover:shadow-xl">
      <h2 className="text-2xl mb-2">{product.name}</h2>
      <p className="mb-4 text-lg">${product.price}</p>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-w-xs h-auto mb-4"
        />
      )}
      <Link to={`/products/${product._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Ver detalles
        </button>
      </Link>
    </div>
  );
};

export default ProductOnSale;
