import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ID de los productos destacados
  const productIds = [
    '67045ebc9a2609b52ec49954',
    '67055dc2ef3cbffd576f13aa',
    '67098ef002baab4a307c05ea',
    '67098f5e02baab4a307c05ec'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          productIds.map(id => axios.get(`/api/products/readone/${id}`))
        );
        setProducts(fetchedProducts.map(response => response.data.product));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [productIds]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="my-10">
      {/* Título centrado */}
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
        Productos Destacados
      </h2>

      {/* Contenedor del carrusel más grande y centrado */}
      <div className="relative max-w-5xl mx-auto"> {/* Cambié max-w-3xl a max-w-5xl para agrandar */}
        {products.length > 0 && (
          <div className="flex justify-center items-center">
            {/* Flecha izquierda */}
            <FiArrowLeft
              className="absolute left-0 text-4xl cursor-pointer text-gray-600 hover:text-gray-800 transition"
              onClick={handlePrevClick}
            />

            {/* Producto actual */}
            <div className="p-6 border rounded-lg shadow-lg bg-white flex flex-col items-center mx-auto"> {/* Añadí más padding y redondeado */}
              <h3 className="text-2xl mb-2">{products[currentIndex].name}</h3>
              <p className="text-lg mb-2">${products[currentIndex].price}</p>
              {products[currentIndex].imageUrl && (
                <img
                  src={products[currentIndex].imageUrl}
                  alt={products[currentIndex].name}
                  className="max-w-md h-auto mb-4"
                />
              )}
              {/* Botón Ver detalles */}
              <Link to={`/products/${products[currentIndex]._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Ver detalles
                </button>
              </Link>
            </div>

            {/* Flecha derecha */}
            <FiArrowRight
              className="absolute right-0 text-4xl cursor-pointer text-gray-600 hover:text-gray-800 transition"
              onClick={handleNextClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
