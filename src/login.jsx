import './css/login.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Login = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!username || !password) {
      setError('Por favor, ingresa tanto el nombre de usuario como la contraseña.');
      return;
    }


    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    alert('¡Bienvenido!');
    
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;


