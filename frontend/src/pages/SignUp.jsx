import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = formData;

    // Verificar si los campos requeridos están llenos
    if (!name || !email || !password || !address) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      // Realizar la petición al backend
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password,
        phone,
        address
      });

      // Obtener el token y el _id del usuario desde la respuesta
      const { token, userId } = response.data;

      // Guardar el token y el _id en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      console.log('Token y User ID guardados en localStorage:', token, userId);

      // Mostrar alerta de éxito
      alert('Usuario registrado exitosamente');

      // Redirigir al usuario a la página de inicio
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Hubo un error al registrar el usuario.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded shadow-md w-96 border border-gray-300 transition-shadow duration-300 hover:shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Registro</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-1">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre*"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-1">Correo Electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico*"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-1">Contraseña *</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña*"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block font-bold mb-1">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-bold mb-1">Dirección *</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Dirección*"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignUp;
