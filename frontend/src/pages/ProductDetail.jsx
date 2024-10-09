import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);
  const productId = match.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/readone/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <p>{product.description}</p>
      <p className="font-bold">Precio: {product.price}</p>
      {/* Aquí puedes agregar un botón para agregar al carrito */}
    </div>
  );
};

export default ProductDetail;
