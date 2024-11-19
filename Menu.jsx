import React, { useEffect, useState } from "react";
import '../css/bodegones.css';
import { Link } from "react-router-dom";

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Cargar los datos de los platos
    fetch("/menuData.json")
      .then((response) => response.json())
      .then((data) => {
        const dishes = data.find((item) => item.type === "table").data;
        
        // Agrupar los platos por categoría
        const groupedByCategory = dishes.reduce((acc, dish) => {
          const category = dish.FK_CATEGORIA;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(dish);
          return acc;
        }, {});

        setMenuData(groupedByCategory);
      })
      .catch((error) => console.error("Error fetching menu data:", error));

    // Cargar los datos de las categorías
    fetch("/categoriesData.json")
      .then((response) => response.json())
      .then((data) => {
        const categoryData = data.find((item) => item.type === "table").data;
        const categoriesMap = categoryData.reduce((acc, category) => {
          acc[category.ID_CATEGORIA] = category.nombreCategoria;
          return acc;
        }, {});
        setCategories(categoriesMap);
      })
      .catch((error) => console.error("Error fetching categories data:", error));
  }, []);

  return (
    <>
      <div className="header">
        <div className="titulo">La Tablita-Menu</div>
        <Link to='/login'><div className="button">Iniciar sesión</div></Link>
        <Link to='/register'><div className="button">Registrarse</div></Link>
      </div>

      <div className="menu-container">
        {Object.keys(menuData).map((categoryId) => (
          <div className="menu-section" key={categoryId}>
            <h2 className="section-title">{categories[categoryId] || `Categoría ${categoryId}`}</h2>
            <ul className="menu-list">
              {menuData[categoryId].map((item) => (
                <li className="menu-item" key={item.ID_PLATO}>
                  <img
                    className="item-image"
                    src={item.fotoURL}
                    alt={item.nombrePlato}
                  />
                  <div className="item-info">
                    <span className="item-name">{item.nombrePlato}</span>
                    <span className="item-price">${item.precio}</span>
                    <p className="item-description">{item.descripcionPlato}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
