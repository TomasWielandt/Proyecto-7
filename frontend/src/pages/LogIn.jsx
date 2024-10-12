import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del formulario enviados:', formData); // Log para verificar los datos del formulario

    try {
      // Enviar la solicitud de inicio de sesión al backend
      const response = await axios.post('/api/users/login', formData);
      console.log('Respuesta recibida del backend:', response.data); // Log de la respuesta del backend
      
      // Obtener el token y el _id de la respuesta
      const { token, userId } = response.data;

      // Almacenar el token y el _id en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      console.log('Token y User ID guardados en localStorage:', token, userId);

      // Mostrar alerta de inicio de sesión exitoso
      alert('¡Login exitoso!');

      // Redirigir al usuario a la página de inicio
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error); // Log del error si ocurre un problema
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded shadow-md w-96 border border-gray-300 transition-shadow duration-300 hover:shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

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
        {/* Botón para iniciar sesión con el mismo estilo que otros botones */}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LogIn;