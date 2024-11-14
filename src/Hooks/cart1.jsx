// App.js
import React from 'react';
import { CartProvider } from './CartContext';
import Cart from '../Components/cart.jsx';

const App = () => {
    return (
        <CartProvider>
            <div>
                <h1>Bienvenido a La Tablita</h1>
                <Cart />
                {/* Aquí podrías tener otros componentes, como un catálogo de productos */}
            </div>
        </CartProvider>
    );
};

export default App;
