import React, { useEffect, useState } from "react";
import '../css/carrito.css';
import { Link } from "react-router-dom";


const Finalizar_compra = () => {
    const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [discountMessage, setDiscountMessage] = useState("");
    const [metodoPago, setMetodoPago] = useState("");
    const handleCampoNumericoChange = (campo, valor) => {
      const numericValue = valor.replace(/\D/g, ""); 
      if (campo === "altura" && numericValue.length > 0) {
        setErrores((prev) => ({ ...prev, altura: "" }));
      }
      if (campo === "contacto" && numericValue.length > 0) {
        setErrores((prev) => ({ ...prev, contacto: "" })); 
      }
    

      setDatosTarjeta({ ...datosTarjeta, [campo]: numericValue });
    };
    
    const handleFechaExpiracionChange = (e) => {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length > 2) {
        valor = `${valor.slice(0, 2)}/${valor.slice(2, 4)}`; 
      }
      setDatosTarjeta((prevState) => ({
        ...prevState,
        fechaExpiracion: valor
      }));
    
      validarDatos("fechaExpiracion", valor);
    };
    
  
    const [datosTarjeta, setDatosTarjeta] = useState({
        nombreTitular: "",
        numeroTarjeta: "",
        fechaExpiracion: "",
        cvv: "",
        direccion: "",
        altura: "",
        contacto: "",
      });
      const [errores, setErrores] = useState({
        nombreTitular: "",
        numeroTarjeta: "",
        fechaExpiracion: "",
        cvv: "",
        direccion: "",
        altura: "",
        contacto: "",
      });
      
      const handleDireccionChange = (e) => {
        const valor = e.target.value;
        const soloLetrasYEspacios = /^[a-zA-Z\s]*$/;
        if (soloLetrasYEspacios.test(valor)) {
          setDatosTarjeta((prevState) => ({
            ...prevState,
            direccion: valor,
          }));
          validarDatos("direccion", valor); 
        }
      };
        
      const handleNumeroTarjetaChange = (e) => {
        const { name, value } = e.target;
        let valorFormateado = value.replace(/\D/g, "");
        valorFormateado = valorFormateado.replace(/(\d{4})(?=\d)/g, "$1 ");
    
        setDatosTarjeta((prevState) => ({
          ...prevState,
          [name]: valorFormateado
        }));
      
        validarDatos(name, valorFormateado);
      };
      
      const handleNombreTitularChange = (e) => {
        const valor = e.target.value;
        const soloLetrasYEspacios = /^[a-zA-Z\s]*$/;
        if (soloLetrasYEspacios.test(valor)) {
          setDatosTarjeta((prevState) => ({
            ...prevState,
            nombreTitular: valor
          }));
        }
      };
      const validarFormulario = () => {
              
        if (datosTarjeta.altura.trim() === "" || datosTarjeta.contacto.trim() === "") {
          return false;
        }
        if (metodoPago === "Efectivo") {
          return datosTarjeta.direccion.trim() !== "";
          
        }

        const camposCompletos = Object.values(datosTarjeta).every((campo) => campo.trim() !== "");
        const sinErrores = Object.values(errores).every((error) => error === "");
        return camposCompletos && sinErrores;
      };
      const handleCvvChange = (e) => {
        const valor = e.target.value;
        if (/^\d*$/.test(valor) && valor.length <= 3) {
          setDatosTarjeta((prevState) => ({
            ...prevState,
            cvv: valor,
          }));
          validarDatos("cvv", valor);
        }
      };
      
      const validarDatos = (campo, valor) => {
        const erroresTemp = { ...errores };

        if (campo === "cvv") {
          if (valor.length !== 3 || !/^\d{3}$/.test(valor)) { 
            erroresTemp.cvv = "El CVV debe tener 3 dígitos.";
          } else {
            erroresTemp.cvv = "";  
          }
        }
        if (campo === "fechaExpiracion") {
          let mes = "";
          let anio = "";
          let valorFormateado = valor;
      
          if (valor.length > 2) {
            valorFormateado = valor.slice(0, 2) + '/' + valor.slice(2); 
            mes = parseInt(valor.slice(0, 2), 10); 
            anio = parseInt(valor.slice(3), 10); 
      
            console.log(`Mes: ${mes}, Año: ${anio}`);
      
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear() % 100; 
    
            if (
              mes < 1 || mes > 12 || 
              (anio < currentYear || (anio === currentYear && mes < currentMonth)) 
            ) {
              erroresTemp.fechaExpiracion = "La tarjeta está vencida o el mes es inválido.";
            } else {
              erroresTemp.fechaExpiracion = "";
            }
          } else {
            erroresTemp.fechaExpiracion = "";
          }
        }
      
        
        if (campo === "numeroTarjeta") {
          const numeroSinEspacios = valor.replace(/\s/g, ""); 
          if (!/^\d{16}$/.test(numeroSinEspacios)) {
            erroresTemp.numeroTarjeta = "El número de tarjeta debe tener 16 dígitos.";
          } else {
            erroresTemp.numeroTarjeta = "";
          }
        }
        if (campo === "nombreTitular" && valor.trim() === "") {
          erroresTemp.nombreTitular = "El nombre del titular es obligatorio.";
        } else {
          erroresTemp.nombreTitular = "";
        }
      
        if (["nombreTitular", "direccion", "altura", "contacto"].includes(campo)) {
          if (valor.trim() === "") {
            erroresTemp[campo] = `El campo ${campo} es obligatorio.`;
          } else {
            erroresTemp[campo] = "";
          }
        }
        
        setErrores(erroresTemp);
        if (campo === "fechaExpiracion") {
          return valorFormateado;
        }
        
    };
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const savedDiscount = localStorage.getItem('discount');
        const savedMessage = localStorage.getItem('discountMessage');

        setCart(savedCart);
        if (savedDiscount) setDiscount(parseFloat(savedDiscount));
        if (savedMessage) setDiscountMessage(savedMessage);
    }, []);

    const total = cart.reduce((total, item) => {
        return total + (parseFloat(item.precio.replace('$', '')) * item.cantidad);
    }, 0);

    const totalConDescuento = total - (total * (discount / 100));
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);
    }, []);
  
    const formatPrice = (precio) => {

      if (typeof precio === 'string' && precio.startsWith('$')) {
        return parseFloat(precio.slice(1)); 
      }
      return parseFloat(precio); 
    };

 
      
    const handleChange = (e) => {
        setMetodoPago(e.target.value);
    }; 
    const handleSubmit = (e) => {
      e.preventDefault(); 
    
      const hayErrores = Object.values(errores).some(error => error !== "");
      if (hayErrores) {
        alert("Por favor, corrige los errores antes de enviar el formulario.");
        return;
      }
      alert("Formulario enviado correctamente");
    };
    
    return (
  <div>
    
<h4>Ingresa los datos para realizar la entrega</h4>
  
<div>
  <label htmlFor="direccion">Dirección</label>
  <input
    type="text"
    id="direccion"
    name="direccion"
    value={datosTarjeta.direccion}
    onChange={handleDireccionChange}
    placeholder="Tu dirección"
    required
  />
  {errores.direccion && <p className="error">{errores.direccion}</p>}
</div>

<div>
  <label htmlFor="altura">Altura</label>
  <input
    type="number"
    id="altura"
    name="altura"
    value={datosTarjeta.altura}
    onChange={(e) => handleCampoNumericoChange("altura", e.target.value)}
    placeholder="1232"
    required
  />
  {errores.altura && <p className="error">{errores.altura}</p>}
</div>

<div>
  <label htmlFor="contacto">Número de contacto:</label>
  <input
    type="number"
    id="contacto"
    name="contacto"
    value={datosTarjeta.contacto}
    onChange={(e) => handleCampoNumericoChange("contacto", e.target.value)}
    placeholder="123213213"
    required
  />
  {errores.contacto && <p className="error">{errores.contacto}</p>}
</div>


    <form >
        <h4>Selecciona el método de pago</h4>
        
        <div>
          <input
            type="radio"
            id="efectivo"
            name="metodoPago"
            value="Efectivo"
            checked={metodoPago === "Efectivo"}
            onChange={handleChange}
          />
          <label htmlFor="efectivo">Efectivo</label>
        </div>

        <div>
          <input
            type="radio"
            id="credito"
            name="metodoPago"
            value="Crédito"
            checked={metodoPago === "Crédito"}
            onChange={handleChange}
          />
          <label htmlFor="credito">Crédito</label>
        </div>

        <div>
          <input
            type="radio"
            id="debito"
            name="metodoPago"
            value="Débito"
            checked={metodoPago === "Débito"}
            onChange={handleChange}
          />
          <label htmlFor="debito">Débito</label>
        </div>

        <div>
          <input
            type="radio"
            id="paypal"
            name="metodoPago"
            value="PayPal"
            checked={metodoPago === "PayPal"}
            onChange={handleChange}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>


    </form>
  { (metodoPago === "Crédito" || metodoPago === "Débito" || metodoPago === "PayPal") && (
  <div className="tarjetaFormulario">
  <h4>Ingresa los datos de tu tarjeta</h4>
  
  <div>
    <label htmlFor="nombreTitular">Nombre Titular</label>

    <input
      type="text"
      id="nombreTitular"
      name="nombreTitular"
      value={datosTarjeta.nombreTitular}
      onChange={handleNombreTitularChange}
      placeholder="Juan Pérez"
      required
    />
      {errores.nombreTitular && <p className="error">{errores.nombreTitular}</p>}
  </div>

  <div>
    <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
    <input
      type="text"
      id="numeroTarjeta"
      name="numeroTarjeta"
      value={datosTarjeta.numeroTarjeta}
      onChange={handleNumeroTarjetaChange}
      placeholder="1234 5678 9876 5432"
      maxLength={19} 
      required
    />
    {errores.numeroTarjeta && <p className="error">{errores.numeroTarjeta}</p>}
  </div>
 <div>
  <div>
  <label for="inputVencimiento">CVV:</label>
 <input
          type="text"
          placeholder="CVV"
          value={datosTarjeta.cvv}
          onChange={handleCvvChange}
        />
        <p style={{ color: 'red' }}>{errores.cvv && <p>{errores.cvv}</p>}</p>
  </div>

  <label for="inputVencimiento">Fecha de Expiración:</label>
  <input
      type="text"
      id="inputVencimiento"
      name="fechaExpiracion"
      value={datosTarjeta.fechaExpiracion}
      onChange={handleFechaExpiracionChange}
      placeholder="MM/AA"
      maxLength={5} 
      required
    />
  {errores.fechaExpiracion && (
    <p style={{ color: 'red' }}>
      {errores.fechaExpiracion}
    </p>
  )}

</div>

</div>

)}
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Precio final</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const precioFinal = formatPrice(item.precio) * item.cantidad;
                  return (
                    <tr key={index}>
                      <td>{item.nombrePlato}</td>
                      <td>${formatPrice(item.precio).toFixed(2)}</td>
                      <td>{item.cantidad}</td>
                      <td>${precioFinal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
      
            <div>
                <p>Total: ${total.toFixed(2)}</p>
                <p>Total con descuento: ${totalConDescuento.toFixed(2)}</p>
            </div>
            <div>
            <button
          type="submit"
          onClick={handleSubmit}
          disabled={!validarFormulario()}
        >
          Confirmar compra
        </button>
            </div>
        </div>
      );
      
};

export default Finalizar_compra;
