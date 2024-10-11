// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel'; // Importar el componente Carousel

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [productosOferta, setProductosOferta] = useState([]); // Nuevo estado para productos en oferta

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

    const fetchProductosOferta = async () => {
      // IDs de los productos en oferta
      const idsProductos = [
        '67098ef002baab4a307c05ea',
        '67055dc2ef3cbffd576f13aa',
        '67098f5e02baab4a307c05ec', // Nuevo ID agregado
      ];

      try {
        const promises = idsProductos.map(id =>
          axios.get(`/api/products/readone/${id}`)
        );
        const responses = await Promise.all(promises);
        setProductosOferta(responses.map(res => res.data.product)); // Suponiendo que los datos de producto están en res.data
      } catch (error) {
        console.error('Error al obtener los productos en oferta', error);
      }
    };

    fetchProduct();
    fetchProductosOferta(); // Llamar a la función para obtener productos en oferta
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

      {/* Sección de productos en oferta */}
      <div className="bg-gray-100 py-8 w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Productos en Oferta</h2> {/* Color cambiado a verde */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {productosOferta.map((producto) => (
              <div key={producto._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                <img 
                  src={producto.imageUrl} 
                  alt={producto.name} 
                  className="h-40 w-40 object-contain mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{producto.name}</h3>
                <p className="text-gray-600 mb-4">${producto.price}</p>
                <Link to={`/products/${producto._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Ver detalles
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agregar el carrusel después de la sección de productos en oferta */}
      <Carousel />
    </div>
  );
};

export default Home;
