import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';
import axios from 'axios';

const PayPalButton = ({ total, items }) => {
  // Obtener el token y el userId de autenticación desde localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Verificar si el token y userId están disponibles
  if (!token || !userId) {
    console.error('No se encontró el token o el userId. El usuario debe iniciar sesión.');
    return <p>Por favor, inicia sesión para continuar con el pago.</p>; // Mostrar mensaje de error si no hay token o userId
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
        try {
          const order = await actions.order.capture();
          console.log('Order', order);
          console.log('Token:', token); // Verifica que el token es correcto
          console.log('UserId:', userId); // Verifica que el userId es correcto

          // Verificar el token y userId de nuevo antes de enviar la solicitud
          if (!token || !userId) {
            throw new Error('No se encontró el token o el userId. Inicia sesión de nuevo.');
          }

          // Enviar la información de la orden al backend, incluyendo el userId
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/create`, {
            userId, // Agregamos el userId al payload
            items, // Pasamos los items del carrito
            orderId: order.id, // Agregamos el ID de la orden de PayPal
            total: order.purchase_units[0].amount.value, // Agregamos el total de la orden
          }, {
            headers: {
              Authorization: `Bearer ${token}`, // Añadir el token al encabezado
            },
          });

          console.log('Order saved to database:', response.data); // Confirmar que se guardó correctamente

          // Mostrar mensaje de éxito o redirigir al usuario si es necesario
          alert('Pago realizado exitosamente y orden guardada');
        } catch (error) {
          console.error('Error saving order or processing PayPal transaction:', error);
          alert('Ocurrió un error al procesar la transacción. Por favor, inténtalo de nuevo.');
        }
      }}
      onError={(err) => {
        console.error('Error with PayPal transaction:', err);
        alert('Hubo un problema con el pago. Por favor, inténtalo de nuevo.');
      }}
    />
  );
};

PayPalButton.propTypes = {
  total: PropTypes.number.isRequired, // total debe ser un número y es requerido
  items: PropTypes.array.isRequired, // items debe ser un array y es requerido
};

export default PayPalButton;
