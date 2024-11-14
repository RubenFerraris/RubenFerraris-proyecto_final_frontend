import React, { useState } from 'react';
import '../css/carrito.css';


const productosEjemplo = [
  { id: 1, nombre: 'Pizza Margherita', precio: 8.5, cantidad: 1, fotoUrl: 'https://via.placeholder.com/150' },
  { id: 2, nombre: 'Pasta Alfredo', precio: 10.0, cantidad: 2, fotoUrl: 'https://via.placeholder.com/150' },
  { id: 3, nombre: 'Ensalada Cesar', precio: 6.5, cantidad: 1, fotoUrl: 'https://via.placeholder.com/150' },
];

const Carrito = () => {
  const [productos, setProductos] = useState(productosEjemplo);

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
  };


  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return; 
    const nuevosProductos = productos.map(producto =>
      producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
    );
    setProductos(nuevosProductos);
  };

  return (
    <div className="container">
     <div className="header"><div className="titulo">La Tablita-Carrito</div><div className="button">Registrarse</div><div className="button">Registrarse</div></div>

      <div className="productos">
        {productos.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} className="producto">
              <img src={producto.fotoUrl} alt={producto.nombre} className="imagenProducto" />
              <div className="detallesProducto">
                <h3>{producto.nombre}</h3>
                <div className="precio">Precio: ${producto.precio}</div>
                <div className="cantidad">
                  <button onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}>-</button>
                  <span className="cantidad">{producto.cantidad}</span>
                  <button onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}>+</button>
                </div>
                <div className="precio">Total: ${(producto.precio * producto.cantidad).toFixed(2)}</div>
                <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

      {productos.length > 0 && (
        <div className="total">
          <div className="precio">Total: ${calcularTotal()}</div>
        </div>
      )}

      <div className="botones">
        <button className="btnComprar">Seguir Comprando</button>
        <button className="btnPagar">Proceder al Pago</button>
      </div>
    </div>
  );
};

export default Carrito;
