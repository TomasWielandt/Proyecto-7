// src/components/PayPalButton.jsx
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ totalAmount, order }) => {
    const [error, setError] = useState(null);

    const handleApprove = async (data) => {
        try {
            // Llama a tu backend para crear la orden
            const response = await axios.post('/api/orders/create', {
                user: order.user, // Asegúrate de que 'order.user' tenga el ID correcto del usuario
                items: order.items,
                totalAmount: totalAmount,
                paymentId: data.orderID
            });
            // Maneja la respuesta como sea necesario
            console.log('Order created:', response.data);
        } catch (err) {
            setError(err.response.data.message);
            console.error(err);
        }
    };

    return (
        <PayPalScriptProvider options={{ 'client-id': 'AboRQxNfOg7rZl-kanHhvlwABYuE8g-4GaDTIdek69dignGMssTHHwgoW70B7PSDhh0rhtryaEQAwCWy' }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: totalAmount.toFixed(2) // Total de la orden
                            }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(handleApprove);
                }}
                onError={(err) => {
                    console.error(err);
                    setError('Error en el proceso de pago');
                }}
            />
            {error && <div>Error: {error}</div>}
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
