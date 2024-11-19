import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.contraseña) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token); 
        setError("");
        navigate("/"); 
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      setLoading(false); 
      console.error("Error al intentar iniciar sesión:", error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="contenedor">
      <div className="register-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
