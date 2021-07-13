import React, { useEffect, useState } from "react";
import PartidoFutbolForm from "./PartidoFutbolForm";
import { db } from "../../../config/firebase";
const PartidoFutbolRender = () => {
  const [partidosFutbol, setPartidosFutbol] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getPartidosFutbol = async () => {
    await db
      .collection("Partidos-Futbol")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPartidosFutbol(docs);
      });
  };
  const onDeletePartidoFutbol = async (id) => {
    if (window.confirm("Seguro que deseas eliminar el evento de Futbol?")) {
      await db.collection("Partidos-Futbol").doc(id).delete();
    }
  };
  const addOrEditPartidoFutbol = async (partidoFutbolObject) => {
    try {
      if (currentId === "") {
        await db.collection("Partidos-Futbol").doc().set(partidoFutbolObject);
        console.log(partidoFutbolObject);
      } else {
        await db
          .collection("Partidos-Futbol")
          .doc(currentId)
          .update(partidoFutbolObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPartidosFutbol();
  });
  return (
    <>
      <div className="col-12 p-2">
        <PartidoFutbolForm
          {...{ addOrEditPartidoFutbol, currentId, partidosFutbol }}
        />
      </div>
      <br />
      <div className="col-12 p-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Equipo 1</th>
              <th>Equipo 2</th>
              <th>Fecha del Partido</th>
              <th>MVP 1</th>
              <th>MVP 2</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          {partidosFutbol.map((partido) => (
            <tbody key={partido.id}>
              <tr>
                <td>{partido.Equipo_1}</td>
                <td>{partido.Equipo_2}</td>
                <td>{partido.Fecha_Partido}</td>
                <td>{partido.MVP_1}</td>
                <td>{partido.MVP_2}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => setCurrentId(partido.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeletePartidoFutbol(partido.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default PartidoFutbolRender;
