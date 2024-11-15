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
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, cantidad: item.cantidad - 1 };
        return updatedItem.cantidad > 0 ? updatedItem : null;
      }
      return item;
    }).filter(Boolean); // Elimina productos con cantidad 0

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  

  const formatPrice = (price) => {
    // Verifica si el precio tiene el símbolo '$' y elimina el primer carácter, luego convierte a número
    if (typeof price === 'string' && price.startsWith('$')) {
      return parseFloat(price.slice(1));  // Elimina el '$' y convierte a número
    }
    return parseFloat(price);  // Si ya es un número, lo devuelve tal cual
  };

  const total = cart.reduce((total, item) => {
    return total + formatPrice(item.price) * item.cantidad;
  }, 0);

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
                <div className='nombre'>{item.name}</div>
                <div className="precio">{item.price}</div>
                <div className="cantidad">
                  <span className='cantidad'>Cantidad: {item.cantidad}</span>
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
        <div className='precio'>Total: ${total.toFixed(2)}</div> {/* Muestra el total con dos decimales */}
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
