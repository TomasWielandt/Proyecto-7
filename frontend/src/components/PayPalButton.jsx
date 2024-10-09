import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = () => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01', // Cambia esto por el valor real
            },
          }],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Order', order);
        // Aquí puedes manejar la respuesta de PayPal
      }}
    />
  );
};

export default PayPalButton;
