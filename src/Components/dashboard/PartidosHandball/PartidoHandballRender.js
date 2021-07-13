import React, { useEffect, useState } from "react";
import PartidoHandballForm from "./PartidoHandballForm";
import { db } from "../../../config/firebase";
const PartidoHandballRender = () => {
  const [partidosHandball, setPartidosHandball] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getPartidosHandball = async () => {
    await db
      .collection("Partidos-Handball")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPartidosHandball(docs);
      });
  };
  const onDeletePartidoHandball = async (id) => {
    if (window.confirm("Seguro que deseas eliminar el evento de Handball?")) {
      await db.collection("Partidos-Handball").doc(id).delete();
    }
  };
  const addOrEditPartidoHandball = async (partidoHandballObject) => {
    try {
      if (currentId === "") {
        await db
          .collection("Noticias-Handball")
          .doc()
          .set(partidoHandballObject);
        console.log(partidoHandballObject);
      } else {
        await db
          .collection("Partidos-Handball")
          .doc(currentId)
          .update(partidoHandballObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPartidosHandball();
  });
  return (
    <>
      <div className="col-12 p-2">
        <PartidoHandballForm
          {...{ addOrEditPartidoHandball, currentId, partidosHandball }}
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
          {partidosHandball.map((partido) => (
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
                    onClick={() => onDeletePartidoHandball(partido.id)}
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

export default PartidoHandballRender;
