import React, { useEffect, useState } from "react";
import NoticiaFisicoForm from "./NoticiaFisicoForm";
import { db } from "../../../config/firebase";
const NoticiaFisicoRender = () => {
  const [noticiasFisico, setNoticiasFisico] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticiasFisico = async () => {
    await db
      .collection("Noticias-Fisico")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasFisico(docs);
      });
  };
  const onDeleteNoticiaFisico = async (id) => {
    if (window.confirm("Seguro que deseas eliminar la noticia?")) {
      await db.collection("Noticias-Fisico").doc(id).delete();
    }
  };
  const addOrEditNoticiaFisico = async (noticiaFisicoObject) => {
    try {
      if (currentId === "") {
        await db.collection("Noticias-Fisico").doc().set(noticiaFisicoObject);
        console.log(noticiaFisicoObject);
      } else {
        await db
          .collection("Noticias-Fisico")
          .doc(currentId)
          .update(noticiaFisicoObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoticiasFisico();
  });
  return (
    <>
      <div className="col-12 p-2">
        <NoticiaFisicoForm
          {...{ addOrEditNoticiaFisico, currentId, noticiasFisico }}
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
          {noticiasFisico.map((noticia) => (
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
                    onClick={() => onDeleteNoticiaFisico(noticia.id)}
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

export default NoticiaFisicoRender;
