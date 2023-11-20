import React, { useState } from "react";

function ListaDeNotas() {
  // Estado para almacenar las listas de notas
  const [pendientes, setPendientes] = useState([]); // Lista de notas pendientes
  const [enProceso, setEnProceso] = useState([]); // Lista de notas en proceso
  const [resueltas, setResueltas] = useState([]); // Lista de notas resueltas

  // Estado para la nota que se está ingresando
  const [newNota, setNewNota] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente", // Estado por defecto es "pendiente"
  });

  // Función para agregar una nota
  const agregarNota = () => {
    if (newNota.titulo.trim() !== "") { // Verificar que el título no esté vacío
      setPendientes([...pendientes, newNota]); // Agregar la nota a la lista de pendientes
      console.log("Se registró una nota");
      console.log("Pendientes:", pendientes);
      setNewNota({
        titulo: "",
        descripcion: "",
        estado: "pendiente",
      }); // Restaurar el estado por defecto
    }
  };

  // Función para mover una nota a la lista de "En Proceso"
  const moverAEnProceso = (notaToMove) => {
    setEnProceso([...enProceso, notaToMove]); // Agregar la nota a la lista de en proceso
    setPendientes(pendientes.filter((nota) => nota !== notaToMove)); // Eliminar la nota de la lista de pendientes
  };

  // Función para mover una nota a la lista de "Resueltas"
  const moverAResuelta = (notaToMove) => {
    setResueltas([...resueltas, notaToMove]); // Agregar la nota a la lista de resueltas
    setEnProceso(enProceso.filter((nota) => nota !== notaToMove)); // Eliminar la nota de la lista de en proceso
  };

  // Función para eliminar una nota de la lista de "Resueltas"
  const eliminarNota = (notaToDelete) => {
    setResueltas(resueltas.filter((nota) => nota !== notaToDelete)); // Eliminar la nota de la lista de resueltas
  };

  return (
    <>
      <h1>Lista de Notas</h1>
      <label>Título de la nota</label>
      <br />
      <input
        type="text"
        value={newNota.titulo}
        onChange={(e) => setNewNota({ ...newNota, titulo: e.target.value })}
      />
      <br />
      <label>Descripción de la nota</label>
      <br />
      <input
        type="text"
        value={newNota.descripcion}
        onChange={(e) => setNewNota({ ...newNota, descripcion: e.target.value })}
      />
      <br />
      <button type="button" onClick={agregarNota}>
        Guardar nota
      </button>
      {/* Mostrar la lista de pendientes */}
      <ul>
        <h2>Pendientes:</h2>
        {pendientes.map((nota, index) => (
          <li key={index}>
            <strong>{nota.titulo}</strong> - {nota.descripcion}
            <button onClick={() => moverAEnProceso(nota)}>En Proceso</button>
          </li>
        ))}
      </ul>
      {/* Mostrar la lista de en proceso */}
      <ul>
        <h2>En Proceso:</h2>
        {enProceso.map((nota, index) => (
          <li key={index}>
            <strong>{nota.titulo}</strong> - {nota.descripcion}
            <button onClick={() => moverAResuelta(nota)}>Resuelto</button>
          </li>
        ))}
      </ul>
      {/* Mostrar la lista de resueltas */}
      <ul>
        <h2>Resueltas:</h2>
        {resueltas.map((nota, index) => (
          <li key={index}>
            <strong>{nota.titulo}</strong> - {nota.descripcion}
            <button onClick={() => eliminarNota(nota)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListaDeNotas;