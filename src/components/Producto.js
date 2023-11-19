import React, { useEffect, useState } from 'react';

function Productos() {
  const productoObj = {
    nombrePro: "",
    precioPro: 0,
    local: ""
  };

  /*--------ESTADOS--------*/
  //registra los productos que se registraron
  const [registroObj, setRegistroObj] = useState(productoObj);
  //Guarda los objeto registrado
  const [guardarObj, setGuardarObj] = useState([]);

  //Guardar precio minimo
  const [precioMinimo, setPrecioMinimo] = useState([]);
  //Guardar nombre del producto
  const [nombresProducto, setNombresProducto] = useState([]);
  /*----------------------------*/

  /*-------FUNCIONES-------*/
  //Esta funcion se encargar de mostrar los productos registrado en la pantalla
  const mostrarProducto = () => {
    console.log("Producto registrado");
    // Agregar el nuevo producto al principio del arreglo
    setGuardarObj([...guardarObj, registroObj]);
    if (!nombresProducto.includes(registroObj.nombrePro)) {
      //Se esta guardando el nombre del producto para comparar
      setNombresProducto([...nombresProducto, registroObj.nombrePro])
    }
    // Limpiar el formulario
    setRegistroObj(productoObj);
  };

  const encontrarProductoBarato = () => {
    setPrecioMinimo([])
    nombresProducto.forEach((element) => {
      let nombre = element;
      let minimo = Infinity;
      let indiceMinimo = -1;
      guardarObj.forEach((item, indice) => {
        if (nombre == item.nombrePro) {
          if (parseFloat(item.precioPro) < parseFloat(minimo)) {
            minimo = item.precioPro
            indiceMinimo = indice
          }
        }
      })
      if (indiceMinimo !== -1) {
        setPrecioMinimo([...precioMinimo, guardarObj[indiceMinimo]])
      }
    })
    console.log("El producto mas barato es: ", precioMinimo);
  }
  /*------------------------*/

  useEffect(() => {
    console.log("Productos registrados:", guardarObj);
    console.log("El producto mas barato es: ", precioMinimo);
  }, [guardarObj]);

  return (
    <>
      <h1>Comparador de precios</h1>

      <h5>Ingrese el producto</h5>
      <input
        type='text'
        value={registroObj.nombrePro}
        onChange={evento => setRegistroObj({ ...registroObj, nombrePro: evento.target.value })}
      ></input>

      <h5>Ingrese el precio</h5>
      <input
        type='number'
        value={registroObj.precioPro}
        onChange={evento => setRegistroObj({ ...registroObj, precioPro: evento.target.value })}
      ></input>

      <h5>Ingrese el nombre del local</h5>
      <input
        type='text'
        value={registroObj.local}
        onChange={evento => setRegistroObj({ ...registroObj, local: evento.target.value })}
      ></input>

      <button type="button" onClick={mostrarProducto}>
        Guardar Producto
      </button>



      {/* Mostramos productos en la página */}
      <div>
        <h2>Productos Registrados</h2>
        {guardarObj.map((element, index) => (
          <div key={index}>
            <p>Nombre: {element.nombrePro}</p>
            <p>Precio: {element.precioPro}</p>
            <p>Local: {element.local}</p>
          </div>
        ))}
      </div>
      {/* Mostrar los productos mas baratos */}
      <div>
        <button type='button' onClick={encontrarProductoBarato}>Encontrar producto barato</button>
        <h2>Productos con el precio bajo</h2>
        {precioMinimo.map((e, indice) => (
          <div key={indice}>
            <p>Nombre: {e.nombrePro}</p>
            <p>Precio: {e.precioPro}</p>
            <p>Local: {e.local}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Productos;