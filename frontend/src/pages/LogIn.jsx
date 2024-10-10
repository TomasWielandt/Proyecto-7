import React, { useState } from 'react';
import axios from 'axios';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar la solicitud de inicio de sesión al backend
      const response = await axios.post('/api/users/login', formData);
      
      // Obtener el token de la respuesta
      const { token } = response.data;
      
      // Almacenar el token en localStorage
      localStorage.setItem('token', token);

      console.log('Token guardado en localStorage:', token);
      
      // Redirigir al usuario o mostrar mensaje de éxito
      // window.location.href = '/dashboard'; // Ejemplo de redirección

    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      // Mostrar un mensaje de error si ocurre un problema
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Iniciar Sesión</h2>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          required
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LogIn;
