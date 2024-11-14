import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

export default function Bodegones() {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  
    fetch('/menuData.json')
      .then((response) => response.json())
      .then((data) => {
        const platos = data.find(item => item.type === 'table' && item.name === 'restaurante__plato').data;
        const categorias = agruparPorCategoria(platos);
        setMenuData(categorias);
      })
      .catch((error) => console.error("Error loading menu data:", error));

   
    fetch('/categoriesData.json')
      .then((response) => response.json())
      .then((data) => {
        const categoriasData = data.find(item => item.type === 'table' && item.name === 'restaurante__categorias').data;
        setCategories(categoriasData); // Guardar las categorías
      })
      .catch((error) => console.error("Error loading categories data:", error));
  }, []);


  const agruparPorCategoria = (platos) => {
    const categoriasMap = {};

    platos.forEach(plato => {
      const { FK_CATEGORIA, nombrePlato, descripcionPlato, precio, fotoURL } = plato;

      if (!categoriasMap[FK_CATEGORIA]) {
     
        categoriasMap[FK_CATEGORIA] = {
          section: `Categoria ${FK_CATEGORIA}`, 
          icono: "local_cafe",  
          items: []
        };
      }
    
      categoriasMap[FK_CATEGORIA].items.push({
        name: nombrePlato,
        description: descripcionPlato,
        price: `$${precio}`,
        imageUrl: fotoURL,
        altText: nombrePlato
      });
    });

  
    return Object.values(categoriasMap);
  };

 
  const agregarAlCarrito = (item) => {
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    
 
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

   
    if (totalProductos >= 5) {
      alert('No puedes agregar más de 5 productos al carrito');
      return; 
    }

   
    const productoExistente = carrito.find((producto) => producto.name === item.name);

    if (productoExistente) {
    
      productoExistente.cantidad += 1;
    } else {
     
      carrito.push({ ...item, cantidad: 1 });
    }

   
    localStorage.setItem('cart', JSON.stringify(carrito));
  };

  return (
    <>
      <div className="header">
        <div className="titulo">La Tablita-Home</div>
        <Link to='/login'><div className="button">Iniciar sesión</div></Link>
        <Link to='/register'><div className="button">Registrarse</div></Link>
      </div>
      <header className="index">
        <section className="portada">
          <h4>En La Tablita, ofrecemos una experiencia gastronómica única que combina sabores tradicionales con un toque innovador...</h4>
          <div className="buscador">
            <div className="icono">
              <i className="material-icons">fmd_good</i>
            </div>
            <input type="search" className='blanco' placeholder="Ingrese búsqueda" />
            <input type="submit" className="material-icons letra-negra" value="search" />
          </div>
        </section>

        <nav className="categorias">
          {categories.map((categoria, index) => (
            <div key={index}>
              <Link to={`/categoria/${encodeURIComponent(categoria.nombreCategoria)}`} className="btn_categoria">
                <i className="material-icons f25">{categoria.icono}</i>
                {categoria.nombreCategoria}
              </Link>
            </div>
          ))}
        </nav>
      </header>
      <main className="index">
        <span className="titulo">OFFERS<div className="material-icons carrito"><Link to='/carrito'>shopping_cart</Link></div></span>
        <div className='conteiner_menu'>
          {menuData.map((section, index) => (
            <div key={index}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="tarjeta_menu">
                    <div>
                      <div className="contenedor_imagen">
                        <img src={item.imageUrl} alt={item.altText} />
                      </div>
                      <div className="contenedor_info">
                        <div className="NombrePlato">{item.name}</div>
                        <div className="precio">{item.price}</div>
                        <p className="descripcion">{item.description}</p>
                        <div className="ContButtons">
                          <button >VER MAS</button>
                          <button onClick={() => agregarAlCarrito(item)} className="material-icons">shopping_cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
