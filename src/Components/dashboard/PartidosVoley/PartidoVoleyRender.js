import React, { useEffect, useState } from "react";
import PartidoVoleyForm from "./PartidoVoleyForm";
import { db } from "../../../config/firebase";
const PartidoVoleyRender = () => {
  const [partidosVoley, setPartidosVoley] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getPartidosVoley = async () => {
    await db
      .collection("Partidos-Voley")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPartidosVoley(docs);
      });
  };
  const onDeletePartidoVoley = async (id) => {
    if (window.confirm("Seguro que deseas eliminar el evento de voley?")) {
      await db.collection("Partidos-Voley").doc(id).delete();
    }
  };
  const addOrEditPartidoVoley = async (partidoVoleyObject) => {
    try {
      if (currentId === "") {
        await db.collection("Noticias-Voley").doc().set(partidoVoleyObject);
        console.log(partidoVoleyObject);
      } else {
        await db
          .collection("Partidos-Voley")
          .doc(currentId)
          .update(partidoVoleyObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPartidosVoley();
  });
  return (
    <>
      <div className="col-12 p-2">
        <PartidoVoleyForm
          {...{ addOrEditPartidoVoley, currentId, partidosVoley }}
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
          {partidosVoley.map((partido) => (
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
                    onClick={() => onDeletePartidoVoley(partido.id)}
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

export default PartidoVoleyRender;
