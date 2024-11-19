import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/carrito.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const eliminarDelCarrito = (index) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, cantidad: item.cantidad - 1 };
        return updatedItem.cantidad > 0 ? updatedItem : null;
      }
      return item;
    }).filter(Boolean); 

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const formatPrice = (precio) => {
    if (typeof precio === 'string' && precio.startsWith('$')) {
      return parseFloat(precio.slice(1));  
    }
    return parseFloat(precio);  
  };

  const total = cart.reduce((total, item) => {
    return total + formatPrice(item.precio) * item.cantidad;
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');  
    setIsLoggedIn(false);  
    navigate('/');  
  };

  const sumarCantidad = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    if (item.cantidad < item.stock) {
      item.cantidad += 1;
    } else {
      alert('No hay suficiente stock para agregar más unidades');
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const restarCantidad = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    if (item.cantidad > 1) {
      item.cantidad -= 1;
    } else {
      updatedCart.splice(index, 1); // Eliminar producto si la cantidad es 1
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="titulo">La Tablita-Carrito</div>
        <div className="button" onClick={handleLogout}>Cerrar sesión</div>
      </div>
      <div className="productos">
        {cart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cart.map((item, index) => (
            <div className="producto" key={index}>
              <img className="imagenProducto" src={item.fotoURL} alt={item.nombrePlato} />
              <div className="detallesProducto">
                <div className='nombre'>{item.nombrePlato}</div>
                <div className="precio">{item.precio}</div>
                <div className="cantidad">
                  <span className='cantidad'>Cantidad: {item.cantidad}</span>
                </div>
              </div>
              <div className="btn_cart">
                <button className="iconos botonesCarrito restar" onClick={() => restarCantidad(index)}>remove</button>
                <p className="botonesCarrito cantidad">{item.cantidad}</p>
                <button className="iconos botonesCarrito sumar" onClick={() => sumarCantidad(index)}>add</button>
              </div>
              <button className="eliminar" onClick={() => eliminarDelCarrito(index)}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
      <div className="total">
        <div className='precio'>Total: ${total.toFixed(2)}</div> 
      </div>
      <form id="form-descuento cupones">
        <label for="codigo">Código de descuento:</label>
        <input type="text" id="codigo" name="codigo" className='m12L' />
        <button type="submit">Validar</button>
    </form>
    <div id="resultado"></div>
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
