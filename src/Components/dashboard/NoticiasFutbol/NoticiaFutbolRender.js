import React, { useEffect, useState } from "react";
import NoticiaFutbolForm from "./NoticiaFutbolForm";
import { db } from "../../../config/firebase";
const NoticiaFutbolRender = () => {
  const [noticiasFutbol, setNoticiasFutbol] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticiasFutbol = async () => {
    await db
      .collection("Noticias-Futbol")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasFutbol(docs);
      });
  };
  const onDeleteNoticiaFutbol = async (id) => {
    if (window.confirm("Seguro que deseas eliminar la noticia?")) {
      await db.collection("Noticias-Futbol").doc(id).delete();
    }
  };
  const addOrEditNoticiaFutbol = async (noticiaFutbolObject) => {
    try {
      if (currentId === "") {
        await db.collection("Noticias-Futbol").doc().set(noticiaFutbolObject);
        console.log(noticiaFutbolObject);
      } else {
        await db
          .collection("Noticias-Futbol")
          .doc(currentId)
          .update(noticiaFutbolObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoticiasFutbol();
  });
  return (
    <>
      <div className="col-12 p-2">
        <NoticiaFutbolForm
          {...{ addOrEditNoticiaFutbol, currentId, noticiasFutbol }}
        />
      </div>
      <br />
      <div className="col-12 p-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Titulo</th>
              <th>Copete</th>
              <th>Cuerpo</th>
              <th>Fuente</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          {noticiasFutbol.map((noticia) => (
            <tbody key={noticia.id}>
              <tr>
                <td>{noticia.Fecha}</td>
                <td>{noticia.Title}</td>
                <td>{noticia.Copete}</td>
                <td>{noticia.Body}</td>
                <td>{noticia.Fuente}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => setCurrentId(noticia.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteNoticiaFutbol(noticia.id)}
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

export default NoticiaFutbolRender;
