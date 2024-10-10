import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/signup" className="text-white">Sign Up</Link></li>
        <li><Link to="/login" className="text-white">Log In</Link></li>
        <li><Link to="/products" className="text-white">Products</Link></li>
        <li><Link to="/cart" className="text-white">Cart</Link></li>
        <li><Link to="/profile" className="text-white">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
