// src/components/ProductsOnSaleList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsOnSaleList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/readall`);
        setProductos(response.data.products);
      } catch (error) {
        console.error('Error al obtener los productos', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="py-8 w-full">
      <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Nuevos Productos</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="bg-white border border-gray-300 p-6 shadow-lg rounded-lg flex flex-col items-center transition-shadow duration-300 hover:shadow-xl"
            >
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
  );
};

export default ProductsOnSaleList;
