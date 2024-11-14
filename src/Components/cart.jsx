// Cart.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/carrito.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
 
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const eliminarDelCarrito = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="titulo">La Tablita-Carrito</div>
        <Link to='/login'><div className="button">Iniciar sesión</div></Link>
        <Link to='/register'><div className="button">Registrarse</div></Link>
      </div>
      <div className="productos">
        {cart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cart.map((item, index) => (
            <div className="producto" key={index}>
              <img className="imagenProducto" src={item.imageUrl} alt={item.name} />
              <div className="detallesProducto">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <div className="cantidad">
                  <span>{item.cantidad}</span>
                </div>
              </div>
              <button className="eliminar" onClick={() => eliminarDelCarrito(index)}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
      <div className="total">
        <p>Total: ${cart.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.cantidad, 0)}</p>
      </div>
      <div className="botones">
        <Link to="/checkout">
          <button className="btnPagar">Proceder al pago</button>
        </Link>
        <Link to="/">
          <button className="btnComprar">Seguir comprando</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
