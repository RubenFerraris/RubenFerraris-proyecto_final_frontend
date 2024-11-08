import React from 'react';
import './css/style.css';
import { Link } from 'react-router-dom';
import MenuPage from './Menu';

const obtenerPlatos = async () => {
    try {
      const data = await fetch('http://localhost:3000/restaurante__menu');
      const results = await data.json();
      return results;
    } catch (error) {
      console.log(error);
    }
}



export default function Bodegones() {
  return (
    <>
      <header className="index">
        <Link className="Link"to="/DescResto">
          <section className="portada">

            <div className="saludo">

              <h2>Hola Usuario</h2>
              <h4>Que desea pedir?</h4>

            </div>

            <div className="buscador">
              <div className="icono">
                <i className="material-icons">fmd_good</i>
              </div>
              <input type="search" className='blanco' placeholder="Ingrese busqueda" />
              <input type="submit" className="material-icons letra-negra" value="search" />
            </div>
          </section>
        </Link>
        <nav className="categorias">
          {menuData.map((item, index) => (
            <div key={index}>
            <Link to={`/categoria/${encodeURIComponent(item.section)}`} className="btn_categoria">
                <i className="material-icons f25">{item.icono}</i>
                {item.section}
              </Link>
            </div>
          ))}
        </nav>
      </header>
      <main className="index">
        <span className="titulo">OFFERS<button className="material-icons carrito">shopping_cart</button></span> 

        <div className='conteiner_menu'>


          {menuData.map((section, index) => (
            <div key={index}>
              {section.items.map((item, itemIndex) => (
              <Link to={`/plato/${encodeURIComponent(item.name)}`}>
                <div className="tarjeta_menu">
                  <div key={itemIndex}>
                    <div className="contenedor_imagen">
                      <img src={item.imageUrl} alt={item.altText} />
                    </div>
                    <div className="contenedor_info">
                      <div className="NombrePlato">{item.name}</div>
                      <div className="precio">{item.price}</div>
                      <div className="ContButtons">
                      <button>VER MAS</button>  <button className="material-icons">shopping_cart</button></div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}

            </div>
          ))}
        </div>


      </main>

    </>
  )
}
