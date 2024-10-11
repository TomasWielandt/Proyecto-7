// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel'; // Importar el componente Carousel

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('/api/products/readone/67045ebc9a2609b52ec49954');
        console.log('Producto recibido:', response.data);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl mb-4">Bienvenido a nuestra tienda</h1>
      <p>¡Explora nuestras ofertas y productos exclusivos!</p>

      {/* Mostrar la oferta del producto */}
      <p className="text-xl font-bold text-red-600 mb-4">¡OFERTA!</p>

      {loading ? (
        <p>Cargando producto en oferta...</p>
      ) : product ? (
        <div className="border p-4 mt-4 rounded shadow-lg bg-white flex flex-col items-center">
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
      ) : (
        <p>No se pudo cargar el producto.</p>
      )}

      {/* Agregar el carrusel después de la oferta */}
      <Carousel />
    </div>
  );
};

export default Home;
