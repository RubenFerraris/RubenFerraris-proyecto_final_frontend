// PlatoDetalle.js
import React from 'react';
import { useParams } from 'react-router-dom';

const platos = [
  {
    name: "Bruschetta",
    price: "$6.50",
    imageUrl: "https://resizer.glanacion.com/resizer/v2/la-pizza-margarita-lleva-los-colores-de-la-M7NX62ONAJGRHMGZQKL3UMOIG4.jpeg?auth=95a4f0c18b4249f8a85c43e89ed95fc56dbfa22ac852945962285bb3c2638680&width=768&height=512&quality=70&smart=true",
    altText: "Bruschetta",
    description: "Deliciosa bruschetta con tomate y albahaca."
  },
  {
    name: "Champiñones Rellenos",
    price: "$7.00",
    imageUrl: "https://ensaladacesar.info/img/ensalada-cesar-con-pollo-173.jpg",
    altText: "Champiñones Rellenos",
    description: "Champiñones rellenos de queso y especias."
  },
  // Agrega más platos aquí...
];

export default function PlatoDetalle() {
  const { nombre } = useParams();
  const plato = platos.find(p => p.name === nombre);

  if (!plato) {
    return <div>Plato no encontrado</div>;
  }

  return (
    <div>
      <h1>{plato.name}</h1>
      <img src={plato.imageUrl} alt={plato.altText} />
      <p>{plato.price}</p>
      <p>{plato.description}</p>
    </div>
  );
}
