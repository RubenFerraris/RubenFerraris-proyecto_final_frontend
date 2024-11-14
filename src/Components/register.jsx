import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Register() {
  const [userData, setUserData] = useState({
    nombre_usuario: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    altura: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    fetch('/usuariosData.json')
      .then((response) => response.json())
      .then((data) => {
        const usuarios = data.find(item => item.type === 'table' && item.name === 'restaurante__usuario').data;
        const userExists = usuarios.some(u => u.nombre_usuario === userData.nombre_usuario || u.email === userData.email);

        if (userExists) {
          setError('El usuario o email ya existe');
        } else {
          usuarios.push(userData); // Agregar el nuevo usuario
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/'); // Redirigir a la página principal después de registrarse
        }
      })
      .catch((error) => console.error('Error loading user data:', error));
  };

  return (
    <div className="contenedor">
    <div className="register-container">
      <h2>Registro</h2>
      <input
        type="text"
        name="nombre_usuario"
        placeholder="Nombre de usuario"
        value={userData.nombre_usuario}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={userData.nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={userData.apellido}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={userData.telefono}
        onChange={handleChange}
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={userData.direccion}
        onChange={handleChange}
      />
      <input
        type="text"
        name="altura"
        placeholder="Altura"
        value={userData.altura}
        onChange={handleChange}
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        value={userData.contraseña}
        onChange={handleChange}
      />
      <button onClick={handleRegister}>Registrarse</button>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
}
