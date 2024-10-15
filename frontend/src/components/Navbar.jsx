import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Sesión cerrada con éxito');
    navigate('/');
  };

  // Función para manejar la búsqueda de productos
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search`, {
        params: { name: searchTerm }, // Se pasa el término de búsqueda como parámetro
      });
      setSearchResults(response.data.products);
      navigate('/search', { state: { searchResults: response.data.products } }); // Redirige a la página de productos con los resultados
    } catch (error) {
      console.error('Error buscando productos:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        
        {/* Sección del logo (columna 1) */}
        <div className="col-span-1">
          <Link to="/" className="inline-block hover:opacity-75 transition duration-300">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado del término de búsqueda
          />
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
            onClick={handleSearch} // Ejecuta la búsqueda cuando se hace clic en el botón
          >
            Buscar
          </button>
        </div>

        {/* Botón para el menú en pantallas pequeñas (centrado y solo visible en pantallas pequeñas) */}
        <div className="col-span-2 md:hidden flex justify-center"> 
          <button
            className="text-white hover:opacity-75 transition duration-300" // Hover en el ícono de menú/cerrar
            onClick={toggleMenu}
          >
            {isOpen ? (
              <img 
                src="https://res.cloudinary.com/dfxlipbvl/image/upload/v1728675823/close_17878910_iset83.png" 
                alt="Cerrar" 
                className="h-8 w-auto"
              />
            ) : (
              <img 
                src="https://res.cloudinary.com/dfxlipbvl/image/upload/v1728674751/list_17025562_htxjxv.png" 
                alt="Menú" 
                className="h-8 w-auto"
              />
            )}
          </button>
        </div>

        {/* Sección de enlaces de navegación (col-span 3 y 4) */}
        <ul className={`col-span-2 md:flex md:justify-end md:space-x-6 items-center ${isOpen ? 'flex flex-col' : 'hidden md:flex'} bg-gray-800 md:bg-transparent`}>
          <li className="py-2 md:py-0">
            <Link to="/signup" className="text-white hover:text-blue-500 transition duration-300">
              Sign Up
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/login" className="text-white hover:text-blue-500 transition duration-300">
              Log In
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/products" className="text-white hover:text-blue-500 transition duration-300">
              Productos
            </Link>
          </li>

          {/* Mostrar "Mi Perfil" solo si el usuario está autenticado */}
          {isAuthenticated() && (
            <li className="py-2 md:py-0">
              <Link to="/profile" className="text-white hover:text-blue-500 transition duration-300">
                Mi Perfil
              </Link>
            </li>
          )}

          {/* Mostrar "Cerrar Sesión" solo si el usuario está autenticado */}
          {isAuthenticated() && (
            <li className="py-2 md:py-0">
              <button 
                onClick={handleLogout} 
                className="text-white hover:text-blue-500 transition duration-300"
              >
                Cerrar Sesión
              </button>
            </li>
          )}

          {/* Sección del Carrito (con imagen) */}
          <li className="py-2 md:py-0">
            <Link to="/cart" className="inline-block hover:opacity-75 transition duration-300">
              <img 
                src="https://res.cloudinary.com/dfxlipbvl/image/upload/v1728673800/add-cart_5733218_eku5le.png" 
                alt="Carrito" 
                className="h-8 w-auto"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
