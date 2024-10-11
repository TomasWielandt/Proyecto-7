import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sección del logo */}
        <div className="text-white text-xl font-bold">
          <Link to="/">Logo</Link>
        </div>

        {/* Botón para el menú en pantallas pequeñas */}
        <button
          className="text-white md:hidden" // Solo visible en pantallas pequeñas
          onClick={toggleMenu}
        >
          {isOpen ? 'Cerrar' : 'Menu'}
        </button>

        {/* Sección de enlaces de navegación (centrados) */}
        <ul className={`flex-col md:flex md:flex-row md:space-x-16 ${isOpen ? 'flex' : 'hidden'} md:visible absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto top-16 left-0 z-10`}>
          <li className="py-2 md:py-0"><Link to="/" className="text-white">Home</Link></li>
          <li className="py-2 md:py-0"><Link to="/signup" className="text-white">Sign Up</Link></li>
          <li className="py-2 md:py-0"><Link to="/login" className="text-white">Log In</Link></li>
          <li className="py-2 md:py-0"><Link to="/products" className="text-white">Products</Link></li>
          <li className="py-2 md:py-0"><Link to="/profile" className="text-white">Profile</Link></li>
          <li className="py-2 md:py-0"><Link to="/cart" className="text-white">Cart</Link></li>
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
