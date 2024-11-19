import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/style.css';

const obtenerPlatos = async () => {
  try {
      const data = await fetch('http://localhost:3000/restaurante__menu');
      const results = await data.json();
      return results;
  } catch (error) {
      console.log(error);
      return [];
  }
};

const Selectcategorias = async (categoria) => {
  try {
      const data = await fetch(`http://localhost:3000/restaurante__plato/${categoria}`);
      const results = await data.json();
      return results;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
};

const Allcategorias = async () => {
  try {
      const data = await fetch(`http://localhost:3000/restaurante__categorias`);
      const results = await data.json();
      return results;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
};

export default function Bodegones() {
  const [menuData, setMenuData] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [nombrePlato, setNombrePlato] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); // Activar estado de carga
      const categorias = await Allcategorias();
      if (Array.isArray(categorias)) {
        setCategories(categorias);
      } else {
        setCategories([]);
      }
      setIsLoading(false); // Desactivar estado de carga
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
        let platos;
        if (selectedCategory) {
          platos = await Selectcategorias(selectedCategory);
        } else {
          platos = await obtenerPlatos();
        }
        if (Array.isArray(platos)) {
          setMenuData(platos);
        } else {
          setMenuData([]);
        }

        setIsLoading(false);
      };
      fetchData();
  }, [selectedCategory]);

  const agregarAlCarrito = (item) => {
    console.log('Producto al agregar:', item);
    console.log('ID_PLATO:', item.ID_PLATO);
    console.log('Stock:', item.stock);

    if (!isLoggedIn) {
      alert("Por favor, inicia sesión para agregar productos al carrito");
      return;
    }
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Carrito antes de agregar:", carrito); // Verifica el carrito antes de agregar
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    if (totalProductos >= 5) {
      alert('No puedes agregar más de 5 productos al carrito');
      return;
    }
  
    const productoExistente = carrito.find((producto) => producto.ID_PLATO === item.ID_PLATO);
  
    if (productoExistente) {
      if (productoExistente.cantidad < productoExistente.stock) {
        productoExistente.cantidad += 1;
      } else {
        alert('No hay suficiente stock disponible para agregar más unidades');
      }
    } else {
      if (!item.ID_PLATO || !item.stock) {
        console.error('Faltan propiedades en el producto:', item);
        return;
      }
  
      carrito.push({ ...item, cantidad: 1, stock: item.stock });
    }
  
    localStorage.setItem('cart', JSON.stringify(carrito));
    console.log("Carrito después de agregar:", carrito); // Verifica el carrito después de agregar
  };
  
  


  const handleLogout = () => {
    localStorage.removeItem('token');  
    setIsLoggedIn(false);  
    navigate('/');  
  };

  const handleCarritoClick = (event) => {
    event.preventDefault(); 
    if (!isLoggedIn) {
      alert("Por favor, inicia sesión para acceder al carrito");
    } else {
      navigate('/carrito');
    }
  };

  const buscandoPlato = (event) => {
    setNombrePlato(event.target.value);  
  };
  
  const buscarPlato = async () => {
    if (nombrePlato.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/restaurante__plato/${nombrePlato}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
        } else {
          console.error('Error al buscar el plato');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
      setIsLoading(false);
    }
  };
  const handleMostrarTodo = () => {
  setSelectedCategory(null); 
  };
  return (
    <>
      <div className="header">
        <div className="titulo">La Tablita-Home</div>
        {isLoggedIn ? (
          <>
            <div className="button" onClick={handleLogout}>Cerrar sesión</div>
          </>
        ) : (
          <>
            <Link to='/login'><div className="button">Iniciar sesión</div></Link>
            <Link to='/register'><div className="button">Registrarse</div></Link>
          </>
        )}
      </div>
      <header className="index">
        <section className="portada">
          <h4>En La Tablita, ofrecemos una experiencia gastronómica única...</h4>
          <div className="buscador">
            <div className="icono">
              <i className="material-icons">fmd_good</i>
            </div>
            <input type="search" className='blanco' placeholder="Ingrese búsqueda" value={nombrePlato} onChange={buscandoPlato} />
            <input type="submit" className="material-icons letra-negra" value="search" onClick={buscarPlato} />
          </div>
        </section>
        <nav className="categorias">
        <div onClick={handleMostrarTodo}>
          <div className="btn_categoria">
            <i className="material-icons f25"></i>
            Mostrar Todo
          </div>
        </div>
          {categories.map((categoria, index) => (
            <div key={index} onClick={() => setSelectedCategory(categoria.nombreCategoria)}>
              <div className="btn_categoria">
                <i className="material-icons f25">{categoria.icono}</i>
                {categoria.nombreCategoria}
              </div>
            </div>
          ))}
        </nav>
      </header>
      <main className="index">
        <span className="titulo">OFFERS
          <div className="material-icons carrito" onClick={handleCarritoClick}>
            shopping_cart
          </div>
        </span>
        <div className="conteiner_menu">
          {menuData.length > 0 ? (
            menuData.map((item, index) => (
              <div className="tarjeta_menu" key={index}>
                <div className="contenedor_imagen">
                  <img src={item.fotoURL} alt={item.nombrePlato} />
                </div>
                <div className="contenedor_info">
                  <div className="NombrePlato">{item.nombrePlato}</div>
                  <div className="precio">{item.precio}</div>
                  <p className="descripcion">{item.descripcionPlato}</p>
                  <div className="ContButtons">
                    <Link to={`/plato/${encodeURIComponent(item.nombrePlato)}`} className="btn-ver-mas">
                      Ver más
                    </Link>
                    <button onClick={() => agregarAlCarrito(item)} className="material-icons">shopping_cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Upss..No hay platos disponibles</div>
          )}
        </div>
      </main>
    </>
  );
}
