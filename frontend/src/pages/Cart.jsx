import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Función para eliminar un artículo del carrito
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Tu Carrito</h1>
      
      {state.items.length === 0 ? (
        <p>No tienes productos en tu carrito.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {state.items.map(item => (
              <li key={item._id} className="flex justify-between mb-2">
                <div>
                  <h2 className="text-lg">{item.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                </div>
                <button 
                  className="text-red-500" 
                  onClick={() => removeItem(item._id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mb-4">
            <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
          </div>
          
          <div>
            <h2 className="text-2xl mb-4">Finalizar Compra</h2>
            <PayPalButton total={calculateTotal()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
