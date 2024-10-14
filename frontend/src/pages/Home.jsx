// src/pages/Home.jsx
import React from 'react';
import Carousel from '../components/Carousel';
import ProductOnSale from '../components/ProductOnSale';
import ProductsOnSaleList from '../components/ProductsOnSaleList';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Bienvenido a nuestra tienda</h1>
      <p>¡Explora nuestras ofertas y productos exclusivos!</p>

      {/* Mostrar la oferta del producto */}
      <p className="text-xl font-bold text-red-600 mb-4">¡OFERTA!</p>
      <ProductOnSale />

      {/* Sección de productos en oferta */}
      <ProductsOnSaleList />

      {/* Agregar el carrusel después de la sección de productos en oferta */}
      <div className="w-full py-8 flex justify-center">
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
