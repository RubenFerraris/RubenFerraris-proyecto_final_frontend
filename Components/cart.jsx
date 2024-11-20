import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/carrito.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState(""); 

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
  
    const validatedCart = savedCart.map((item) => ({
      ...item,
      cantidad: Math.min(item.cantidad, item.stock, 5)
    }));
    console.log(validatedCart)
    setCart(validatedCart);
    sessionStorage.setItem('cart', JSON.stringify(validatedCart));
  }, []);
  

  const validarDescuento = async (codigo) => {
    if (!codigo) {
      setDiscount(0); 
      setDiscountMessage("Sin descuento aplicado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/descuentos/${codigo}`);
      const data = await response.json();

      if (response.status === 200) {
        const porcentajeDescuento = data.data[0].cant_descuento;
        setDiscount(porcentajeDescuento);
        setDiscountMessage(`¡Descuento del ${porcentajeDescuento}% aplicado!`);
        sessionStorage.setItem('discount', porcentajeDescuento);
        sessionStorage.setItem('discountMessage', `¡Descuento del ${porcentajeDescuento}% aplicado!`);

        setTimeout(() => {
          setDiscountMessage("");
        }, 1000);
      } else {
        setDiscount(0);
        setDiscountMessage("Código de descuento inválido o expirado.");
        setTimeout(() => {
          setDiscountMessage("");
        }, 2000);
      }
    } catch (error) {
      setDiscount(0);
      setDiscountMessage("Error al validar el código.");
      setTimeout(() => {
        setDiscountMessage("");
      }, 3000);

      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value.trim();
    validarDescuento(codigo); 
  };

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCart(savedCart);

    const savedDiscount = sessionStorage.getItem('discount');
    const savedMessage = sessionStorage.getItem('discountMessage');
    if (savedDiscount) setDiscount(parseFloat(savedDiscount));
    if (savedMessage) setDiscountMessage(savedMessage);
  }, []);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const eliminarDelCarrito = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));  
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
    sessionStorage.removeItem('token'); 
    setIsLoggedIn(false);  
    navigate('/');  
  };

const sumarCantidad = (index) => {
  const updatedCart = [...cart];
  const item = updatedCart[index];

  if (item.cantidad >= item.stock || item.cantidad >= 5) {
    alert('No puedes agregar más de 5 productos o exceder el stock disponible.');
    return;
  }

  item.cantidad += 1; 
  setCart(updatedCart);
  sessionStorage.setItem('cart', JSON.stringify(updatedCart)); 
};


const restarCantidad = (index) => {
  const updatedCart = [...cart];
  const item = updatedCart[index];

  if (item.cantidad > 1) {
    item.cantidad -= 1; 
  } else {
    updatedCart.splice(index, 1); 
  }

  setCart(updatedCart);
  sessionStorage.setItem('cart', JSON.stringify(updatedCart)); 
};


  const totalConDescuento = total - (total * (discount / 100));

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
      
      <div className="total ">
        <div className="precio">Total: ${total.toFixed(2)}</div>
      </div>
      <div className="total ">
        <div className="precio">
          Total con descuento: ${totalConDescuento.toFixed(2)}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} id="form-descuento">
        <label htmlFor="codigo">Código de descuento (opcional):</label>
        <input type="text" id="codigo" name="codigo" className="m12L"  disabled={cart.length === 0} />
        <button type="submit" disabled={cart.length === 0}>Validar</button>
      </form>
      <div id="resultado">{discountMessage}</div>

      <div className="botones">
        <Link to="/Finalizar_compra">
          <button className="btnPagar" disabled={cart.length === 0}>Proceder al pago</button>
        </Link>
        <Link to="/">
          <button className="btnComprar">Seguir comprando</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
