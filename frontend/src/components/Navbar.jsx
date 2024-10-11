import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        
        {/* Sección del logo (columna 1) */}
        <div className="col-span-1">
          <Link to="/" className="inline-block">
            <img 
              src="https://res.cloudinary.com/dfxlipbvl/image/upload/v1728668663/control-de-juego_uqtiep.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Sección de la barra de búsqueda (columna 2) */}
        <div className="flex items-center col-span-1">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="p-2 rounded-l-md w-full border-none outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
            Buscar
          </button>
        </div>

        {/* Botón para el menú en pantallas pequeñas (solo visible en pantallas pequeñas) */}
        <button
          className="text-white md:hidden col-span-2" // Solo visible en pantallas pequeñas
          onClick={toggleMenu}
        >
          {isOpen ? 'Cerrar' : 'Menu'}
        </button>

        {/* Sección de enlaces de navegación (col-span 3 y 4) */}
        <ul className={`col-span-2 md:flex md:justify-end md:space-x-6 items-center ${isOpen ? 'flex flex-col' : 'hidden md:flex'} bg-gray-800 md:bg-transparent`}>
          <li className="py-2 md:py-0"><Link to="/signup" className="text-white">Sign Up</Link></li>
          <li className="py-2 md:py-0"><Link to="/login" className="text-white">Log In</Link></li>
          <li className="py-2 md:py-0"><Link to="/products" className="text-white">Productos</Link></li>
          <li className="py-2 md:py-0"><Link to="/profile" className="text-white">Mi Perfil</Link></li>
          <li className="py-2 md:py-0"><Link to="/cart" className="text-white">Carrito</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
