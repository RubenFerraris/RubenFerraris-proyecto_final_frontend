import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import MenuPage from './Menu';

const menuData = [
  {
    section: "Entradas",
    icono: "local_cafe",
    items: [
      {
        name: "Bruschetta",
        price: "$6.50",
        imageUrl: "https://resizer.glanacion.com/resizer/v2/la-pizza-margarita-lleva-los-colores-de-la-M7NX62ONAJGRHMGZQKL3UMOIG4.jpeg?auth=95a4f0c18b4249f8a85c43e89ed95fc56dbfa22ac852945962285bb3c2638680&width=768&height=512&quality=70&smart=true",
        altText: "Bruschetta",
      },
      {
        name: "Champiñones Rellenos",
        price: "$7.00",
        imageUrl: "https://ensaladacesar.info/img/ensalada-cesar-con-pollo-173.jpg",
        altText: "Champiñones Rellenos",
      },
    ],
  },
  {
    section: "Platos Principales",
    icono: "local_cafe",
    items: [
      {
        name: "Salmón a la Parrilla",
        price: "$18.50",
        imageUrl: "https://www.pressurecookrecipes.com/wp-content/uploads/2021/02/california-roll.jpg",
        altText: "Salmón a la Parrilla",
      },
      {
        name: "Bistec con Papas Fritas",
        price: "$21.00",
        imageUrl: "https://www.pressurecookrecipes.com/wp-content/uploads/2021/02/california-roll.jpg",
        altText: "Bistec con Papas Fritas",
      },
    ],
  },
  {
    section: "Postres",
    icono: "local_cafe",
    items: [
      {
        name: "Tarta de Queso",
        price: "$5.50",
        imageUrl: "https://www.pressurecookrecipes.com/wp-content/uploads/2021/02/california-roll.jpg",
        altText: "Tarta de Queso",
      },
      {
        name: "Mousse de Chocolate",
        price: "$6.00",
        imageUrl: "https://www.pressurecookrecipes.com/wp-content/uploads/2021/02/california-roll.jpg",
        altText: "Mousse de Chocolate",
      },
    ],
  },
];
export default function Bodegones() {
  return (
    <>
    <div className="header"><div className="titulo">La Tablita-Home</div><Link to='/login'><div className="button">Iniciar sesion</div></Link>
    <Link to='/register'><div className="button">Registrarse</div></Link></div>
      <header className="index">
     
          <section className="portada">

              <h4>En La Tablita, ofrecemos una experiencia gastronómica única que combina sabores tradicionales con un toque innovador. Nuestro menú, elaborado con ingredientes frescos y locales, está diseñado para sorprender. Disfruta de un ambiente ideal para cenas románticas, reuniones familiares o almuerzos con amigos, con un servicio cálido y atento. ¡Te esperamos para que descubras el auténtico sabor que te hará regresar!</h4>
            <div className="buscador">
              <div className="icono">
                <i className="material-icons">fmd_good</i>
              </div>
              <input type="search" className='blanco' placeholder="Ingrese busqueda" />
              <input type="submit" className="material-icons letra-negra" value="search" />
            </div>
          </section>
    
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
        <span className="titulo">OFFERS<div className="material-icons carrito">shopping_cart</div></span> 

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
                      <button>VER MAS</button>  <button className="material-icons ">shopping_cart</button></div>
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
