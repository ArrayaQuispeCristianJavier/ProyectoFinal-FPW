import React, { useEffect, useState } from 'react';

function Productos() {

  const ProductoObj = {
    nombreProducto: "",
    nombreLocal: "",
    precioProducto: 0

  };

  const [newProductoObj, setNewProductoObj] = useState(ProductoObj);
  //Estado para la lista del producto
  const [productos, setProductos] = useState([]);
  //Estado para el registro del producto
  const [registroProducto, setRegistroProducto] = useState("");
  //Estado para el registro de producto comparados
  const [registroProductoComparado, setRegistroProductoComparado] = useState("");

  /*ProductoMenorPrecio*/
  const [precio, setPrecio] = useState(0);
  const [nombre, setNombre] = useState("");
  const [local, setLocal] = useState("");

  const nuevoProducto = () => {
    //Copia del array 'productos' con el (...), para no modificar el array existente, sino creamos un nuevo arreglo que contiene mas newProductObj
    const newProducto = [...productos, newProductoObj]
    //Todo lo que se registre en newProducto se guardara en setProducto
    setProductos(newProducto);
    //Reiniciar o limpiar los campos
    setNewProductoObj({
      nombreProducto: "",
      nombreLocal: "",
      precioProducto: 0
    })
  }

  const mostrarProducto = () => {
    let registroProducto ="";
    
    console.log("Lista de producto: ", productos);
  };

  const productoMenorPrecio = () => {
    let productoBarato = null;
    productos.forEach((elemento) => {
      setPrecio(elemento.precio);
      setLocal(elemento.local);
      setNombre(elemento.nombre);

      if (!productoBarato || (nombre === productoBarato.nombre && precio < productoBarato.precio) || (nombre !== productoBarato.nombre)) {
        setProductoBarato({
          nombre: nombre,
          precio: precio,
          local: local
        })
        console.log("Se guardo el producto comparado" + productoBarato);
      }
      if (productoBarato){
      setRegistroProductoComparado(`Nombre del producto: ${productoBarato.nombre} -- Precio del producto más bajo: $${productoBarato.precio} -- Nombre del local: ${productoBarato.local}`)
      }
    })
    console.log(registroProductoComparado);
  };



  useEffect(() => {
    mostrarProducto();
    productoMenorPrecio();
  }, [productos, registroProductoComparado])


  return (
    <>
      <h1>Comparador de precios</h1>
      <div>
        <form>
          <label>Nombre del producto</label><br />
          <input
            value={newProductoObj.nombreProducto}
            onChange={(e) => setNewProductoObj({ ...newProductoObj, nombreProducto: e.target.value })}
          /><br />

          <label>Precio del producto</label><br />
          <input
            type="number"
            value={newProductoObj.precioProducto}
            onChange={(e) => setNewProductoObj({ ...newProductoObj, precioProducto: e.target.value })}
          /><br />

          <label>Nombre del comercio</label> <br />
          <input
            value={newProductoObj.nombreLocal}
            onChange={(e) => setNewProductoObj({ ...newProductoObj, nombreLocal: e.target.value })}
          /><br />

          <button type='button' onClick={nuevoProducto}>Guardar producto</button>
          <button type='button' onClick={productoMenorPrecio}>Guardar el producto de menor precio</button>

        </form>
      </div>
    </>
  )
}
export default Productos;
