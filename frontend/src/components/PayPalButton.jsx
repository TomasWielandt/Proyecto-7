import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';

const PayPalButton = ({ total }) => {
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
        // Aquí puedes manejar la respuesta de PayPal y completar el flujo de la compra
      }}
    />
  );
};

PayPalButton.propTypes = {
  total: PropTypes.number.isRequired, // total debe ser un número y es requerido
};

export default PayPalButton;
