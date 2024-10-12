import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-repeat bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dfxlipbvl/image/upload/v1728690299/doodle-gamer-set-ilustracion_166742-67_fgqj2j.avif')`,
      }}
    >
      <CartProvider>
        <ErrorBoundary>
          <Navbar /> {/* Navbar siempre arriba */}
          <div className="flex-grow bg-white bg-opacity-80"> {/* Añadir un fondo blanco semitransparente */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          <Footer /> {/* Footer siempre abajo */}
        </ErrorBoundary>
      </CartProvider>
    </div>
  );
};

export default App;
