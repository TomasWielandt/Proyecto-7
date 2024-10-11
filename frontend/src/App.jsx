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
    <div className="flex flex-col min-h-screen"> {/* Flex container principal */}
      <CartProvider>
        <ErrorBoundary>
          <Navbar /> {/* Navbar siempre arriba */}
          <div className="flex-grow"> {/* Este contenedor ocupa el espacio disponible entre Navbar y Footer */}
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
