import React, { useEffect, useState } from 'react';

function Productos() {
  
    const ProductoObj = {
    nombreProducto: "",
    precioProducto: 0,
    nombreLocal: ""
  };

  const [newProductoObj, setNewProductoObj] = useState(ProductoObj);
  //Estado para la lista del producto
  const [productos, setProductos] = useState([]);
  //Estado para el registro del producto
  const [registroProducto, setRegistroProducto] = useState("");
  //Estado para el producto mas barato
  const [productoBarato, setProductoBarato] = useState(null);
  //Estado para el registro de producto comparados
  const [registroProductoComparado, setRegistroProductoComparado] = useState("");

 const nuevoProducto = () => {
    //Copia del array 'productos' con el (...), para no modificar el array existente, sino creamos un nuevo arreglo que contiene mas newProductObj
    const newProducto = [...productos, newProductoObj]
    //Todo lo que se registre en newProducto se guardara en setProducto
    setProductos(newProducto);
    //Reiniciar o limpiar los campos
    setNewProductoObj({
        nombreLocal:"",
        nombreProducto: "",
        precioProducto: 0
    })
   }

   const mostrarProducto = () => {
    console.log("Lista de producto: ", productos);
   };

   useEffect(()=>{
    mostrarProducto();
   }, [productos])


  return(
    <>
    <h1>Comparador de precios</h1>
    <div>
    <p>Nuevo Producto: {JSON.stringify(newProductoObj)}</p>
    <p>Lista de Productos: {JSON.stringify(productos)}</p>
    <p>Registro de Producto: {registroProducto}</p>
    <p>Producto Barato: {JSON.stringify(productoBarato)}</p>
    <p>Registro de Productos Comparados: {registroProductoComparado}</p>
    <button type='button' onClick={nuevoProducto}>Guardar producto</button>
   </div>
   
   </>
  )
}
export default Productos;
