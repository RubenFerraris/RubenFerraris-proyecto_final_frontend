
import React from 'react';
import { useParams, Link } from 'react-router-dom';



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
