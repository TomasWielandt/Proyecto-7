import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener el token almacenado en localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        console.log('UserID:', userId);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/readone/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al obtener los datos del perfil');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userId = localStorage.getItem('userId');

        // Crea un nuevo objeto con solo los campos necesarios para la actualización
        const { password, ...dataToUpdate } = userData;

        // Envía la actualización sin la contraseña si no se ha proporcionado
        await axios.put(`/api/users/update/${userId}`, dataToUpdate, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setIsEditing(false);
        alert('Perfil actualizado con éxito');
    } catch (err) {
        console.error(err);
        setError('Error al actualizar el perfil');
    }
};


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md transition-transform transform hover:shadow-xl">
        <h2 className="text-2xl mb-4">Perfil de Usuario</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Dirección</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nueva Contraseña (opcional)</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
              Guardar Cambios
            </button>
            <button
              type="button"
              className="mt-2 bg-gray-500 text-white p-2 w-full hover:bg-gray-600 transition"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.phone}</p>
            <p><strong>Dirección:</strong> {userData.address}</p>
            <button
              className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
