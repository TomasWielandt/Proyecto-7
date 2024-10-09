import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Lógica para agregar un artículo
      return { ...state, items: [...state.items, action.payload] };
    // Agregar otros casos según sea necesario
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
