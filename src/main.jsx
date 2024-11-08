import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bodegones from './App.jsx'
import PlatoDetalle from './PlatoDetalle.jsx';
import Menu from './Menu.jsx'
import CategoriaPlatos from './CategoriaPlatos.jsx';
import Reviews from './reseeñas.jsx'
import Login from './login.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    
    <Routes>
      <Route path='/' element={<Bodegones/>}></Route>
      <Route path="/plato/:nombre" element={PlatoDetalle} />
      <Route path="/categoria/:categoria" component={CategoriaPlatos} />
      <Route path='/Menu' element={<Menu/>}></Route>
      <Route path='/reseñas' element={<Reviews/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
