import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const Home = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener el producto específico desde la base de datos
    const fetchProduct = async () => {
      try {
        // Usar la ruta manual con el ID del producto
        const response = await axios.get('/api/products/readone/67045ebc9a2609b52ec49954');
        console.log('Producto recibido:', response.data); // Verifica que los datos sean correctos
        setProduct(response.data.product); // Establecer el producto recibido
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Bienvenido a nuestra tienda</h1>
      <p>¡Explora nuestras ofertas y productos exclusivos!</p>

      {/* Mostrar la oferta del producto */}
      <p className="text-xl font-bold text-red-600">¡OFERTA!</p>

      {loading ? (
        <p>Cargando producto en oferta...</p>
      ) : product ? (
        <div className="border p-4 mt-4 rounded shadow-lg">
          <h2 className="text-2xl">{product.name}</h2>
          <p>${product.price}</p>
          {/* Agregar una imagen si está disponible */}
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto mt-4"
            />
          )}
          {/* Enlace para ver detalles del producto */}
          <Link to={`/products/${product._id}`} className="text-blue-500 mt-4 inline-block">
            Ver detalles
          </Link>
        </div>
      ) : (
        <p>No se pudo cargar el producto.</p>
      )}
    </div>
  );
};

export default Home;
