import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Sección del logo */}
        <div className="text-white text-xl font-bold">
          <Link to="/">Logo</Link>
        </div>
        
        {/* Sección de enlaces de navegación (centrados) */}
        <ul className="flex space-x-16">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/signup" className="text-white">Sign Up</Link></li>
          <li><Link to="/login" className="text-white">Log In</Link></li>
          <li><Link to="/products" className="text-white">Products</Link></li>
          <li><Link to="/profile" className="text-white">Profile</Link></li>
          <li><Link to="/cart" className="text-white">Cart</Link></li>
        </ul>
        
        {/* Sección de la barra de búsqueda (a la derecha) */}
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="p-2 rounded-l-md border-none outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
            Buscar
          </button>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
