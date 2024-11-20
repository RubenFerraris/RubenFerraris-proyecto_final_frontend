// src/components/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  const location = useLocation();

  // Lista de rutas en las que no quieres mostrar el Header y el Footer
  const noHeaderFooterRoutes = ['/login', '/register'];

  // Verifica si la ruta actual está en la lista
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header location={location} />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
