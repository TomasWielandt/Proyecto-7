import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Importa el componente ProductCard

const ProductSearch = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Resultados de la búsqueda</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <ProductCard key={product._id} product={product} /> // Renderiza ProductCard con los datos del producto
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
