import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Función para eliminar un artículo del carrito
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // Función para aumentar la cantidad
  const increaseQuantity = (id, stock) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: Math.min(stock, state.items.find(item => item._id === id).quantity + 1) } });
  };

  // Función para disminuir la cantidad
  const decreaseQuantity = (id) => {
    const item = state.items.find(item => item._id === id);
    if (item.quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: item.quantity - 1 } });
    }
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
                  <div className="flex items-center">
                    <button 
                      className="bg-gray-200 p-1 rounded-l" 
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button 
                      className="bg-gray-200 p-1 rounded-r" 
                      onClick={() => increaseQuantity(item._id, item.stock)} // Usar `stock` en lugar de `availableQuantity`
                    >
                      +
                    </button>
                  </div>
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
            <h3 className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          
          <div>
            <h2 className="text-2xl mb-4">Finalizar Compra</h2>
            <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
              <PayPalButton total={calculateTotal()} items={state.items} />
            </PayPalScriptProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
