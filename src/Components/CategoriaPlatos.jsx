
import React from 'react';
import { useParams, Link } from 'react-router-dom';

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

export default function CategoriaPlatos() {
  const { categoria } = useParams();
  const categoriaSeleccionada = menuData.find(section => section.section === decodeURIComponent(categoria));

  if (!categoriaSeleccionada) {
    return <div>Categoría no encontrada</div>;
  }

  return (
    <div>
      <h1>{categoriaSeleccionada.section}</h1>
      <div className="conteiner_menu">
        {categoriaSeleccionada.items.map((item, index) => (
        <Link to={`/categoria/${encodeURIComponent(item.section)}`} className="btn_categoria">
            <div className="tarjeta_menu">
              <div>
                <div className="contenedor_imagen">
                  <img src={item.imageUrl} alt={item.altText} />
                </div>
                <div className="contenedor_info">
                  <div className="NombrePlato">{item.name}</div>
                  <div className="precio">{item.price}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
