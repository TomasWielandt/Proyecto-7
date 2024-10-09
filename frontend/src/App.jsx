import './App.css';
import PayPalButton from './components/PayPalButton/PayPalButton';

const App = () => {
    const order = {
        user: "67046b543c6a64b69981ff28", // ID del usuario autenticado
        items: [
            { productId: "67045ebc9a2609b52ec49954", quantity: 2 },
            { productId: "67055dc2ef3cbffd576f13aa", quantity: 1 },
        ],
    };
    const totalAmount = 1390000; // Cambia esto por el cálculo real del total

    return (
        <div>
            <h1>Realiza tu pago</h1>
            <PayPalButton totalAmount={totalAmount} order={order} />
        </div>
    );
};

export default App;