import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemExists = state.items.find(item => item._id === action.payload._id);
      if (itemExists) {
        return {
          ...state,
          items: state.items.map(item => 
            item._id === action.payload._id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item => 
          item._id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        ),
      };
    }
    default:
      return state;
  }
};


// Agregar la validación de PropTypes para children
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Definir los PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validar que children sea un nodo React
};

export default CartContext;
