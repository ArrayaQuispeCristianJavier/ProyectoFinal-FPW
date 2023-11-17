import React, { useState } from 'react';

const Productos = () => {
  
  const [precio, setPrecio] = useState(0);
  const [nombre, setNombre] = useState("");
  const [local, setLocal] = useState("");
  const [productos, setProductos] = useState([]);
  const [guardarProductoBarato, setGuardarProductoBarato] = useState(null);


  const nuevoProducto = () => {
    const nuevoProducto = { nombre, precio, local };
    setProductos((anterioresProductos) => [...anterioresProductos, nuevoProducto]);
    mostrarProducto();
    setNombre("");
    setPrecio(0);
    setLocal("");
  };

  const productoMenorPrecio = () => {
    let productoBarato = null;

    productos.forEach((elemento) => {
      let precio = elemento.precio;
      let nombre = elemento.nombre;
      let local = elemento.local;

      if (!productoBarato || (nombre === productoBarato.nombre && precio < productoBarato.precio) || (nombre !== productoBarato.nombre)) {
        productoBarato = {
          nombre: nombre,
          precio: precio,
          local: local
        };
      }
    });

    if (productoBarato) {
      setGuardarProductoBarato(`Nombre del producto: ${productoBarato.nombre} -- Precio del producto más bajo: $${productoBarato.precio} -- Nombre del local: ${productoBarato.local}`);
    }
  };

  const mostrarProducto = () => {
    let registroProducto = "";

    productos.forEach((elemento) => {
      registroProducto = registroProducto + `Nombre del producto: ${elemento.nombre} -- Precio del producto: $ ${elemento.precio} -- Nombre del local: ${elemento.local}\n`;
    });

    console.log(registroProducto);
  };

  return (
    <div style={{ fontFamily: '-moz-initial' }}>
      <h1>Comparador de precios</h1>
      <div>
        <form>
          <label>
            Nombre del producto
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <br />
          <label>
            Precio del producto
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </label>
          <br />
          <label>
            Nombre del comercio
            <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={nuevoProducto}>
            Guardar producto
          </button>
          <button type="button" onClick={productoMenorPrecio}>
            Obtener producto barato
          </button>
        </form>
      </div>

      <div>
        <h2>Productos Registrados:</h2>
        {productos.map((producto, index) => (
          <div key={index}>
            <p>
              Nombre: {producto.nombre}, Precio: ${producto.precio}, Local: {producto.local}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2>Producto más barato:</h2>
        
        <p>{guardarProductoBarato}</p>
        
      </div>
    </div>
  );
};

export default Productos;
