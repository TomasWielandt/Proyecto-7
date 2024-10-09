import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required className="border p-2 w-full mb-4" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 w-full mb-4" />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required className="border p-2 w-full mb-4" />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Crear Cuenta</button>
    </form>
  );
};

export default SignUp;
