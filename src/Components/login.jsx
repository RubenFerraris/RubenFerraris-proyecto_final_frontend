import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('/usuariosData.json')
      .then((response) => response.json())
      .then((data) => {
        const usuarios = data.find(item => item.type === 'table' && item.name === 'restaurante__usuario').data;
        const user = usuarios.find(
          (u) => u.nombre_usuario === username && u.contraseña === password
        );
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      })
      .catch((error) => console.error('Error loading user data:', error));
  };

  return (
    <div className="contenedor">
      <div className="register-container">
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar Sesión</button>
        {error && <p className="error-message">{error}</p>}
        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}
