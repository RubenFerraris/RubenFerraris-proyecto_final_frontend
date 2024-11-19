import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bodegones from './Components/App.jsx'
import PlatoDetalle from './Components/PlatoDetalle.jsx';
import Menu from './Components/Menu.jsx'
import CategoriaPlatos from './Components/CategoriaPlatos.jsx';
import Reviews from './Components/reseeñas.jsx'
import Login from './Components/login.jsx'
import Register from './Components/register.jsx'
import Carrito from './Components/cart.jsx'
import Finalizar_compra  from './Components/Finalizar_compra'
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
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/carrito' element={<Carrito/>}></Route>
      <Route path='/Finalizar_compra' element={<Finalizar_compra/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
