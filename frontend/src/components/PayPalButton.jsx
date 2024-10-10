import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';
import axios from 'axios';

const PayPalButton = ({ total, items }) => {
  // Obtener el token de autenticación desde localStorage
  const token = localStorage.getItem('token'); 

  // Verificar si el token está disponible
  if (!token) {
    console.error('No se encontró el token de autenticación. El usuario debe iniciar sesión.');
    return <p>Por favor, inicia sesión para continuar con el pago.</p>; // Mostrar mensaje de error si no hay token
  }

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total, // Utilizamos el total que se recibe por props
            },
          }],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Order', order);
        console.log('Token:', token); // Verifica que el token es correcto
        // Enviar la información de la orden al backend
        try {
          const response = await axios.post('/api/orders/create', {
            items, // Pasamos los items del carrito
          }, {
            headers: {
              Authorization: `Bearer ${token}`, // Añadir el token al encabezado
            },
          });

          console.log('Order saved to database:', response.data); // Confirmar que se guardó correctamente
        } catch (error) {
          console.error('Error saving order:', error);
        }

        // Manejo adicional de la orden, como mostrar un mensaje de éxito al usuario
      }}
      onError={(err) => {
        console.error('Error with PayPal transaction:', err);
        // Mostrar mensaje de error si algo falla con PayPal
      }}
    />
  );
};

PayPalButton.propTypes = {
  total: PropTypes.number.isRequired, // total debe ser un número y es requerido
  items: PropTypes.array.isRequired, // items debe ser un array y es requerido
};

export default PayPalButton;
