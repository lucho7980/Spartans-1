import React, { useEffect, useState } from "react";
import NoticiaHandballForm from "./NoticiaHandballForm";
import { db } from "../../../config/firebase";
const NoticiaHandballRender = () => {
  const [noticiasHandball, setNoticiasHandball] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticiasHandball = async () => {
    await db
      .collection("Noticias-Handball")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasHandball(docs);
      });
  };
  const onDeleteNoticiaHandball = async (id) => {
    if (window.confirm("Seguro que deseas eliminar la noticia?")) {
      await db.collection("Noticias-Handball").doc(id).delete();
    }
  };
  const addOrEditNoticiaHandball = async (noticiaHandballObject) => {
    try {
      if (currentId === "") {
        await db.collection("Noticias-Handball").doc().set(noticiaHandballObject);
        console.log(noticiaHandballObject);
      } else {
        await db
          .collection("Noticias-Handball")
          .doc(currentId)
          .update(noticiaHandballObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoticiasHandball();
  });
  return (
    <>
      <div className="col-12 p-2">
        <NoticiaHandballForm
          {...{ addOrEditNoticiaHandball, currentId, noticiasHandball }}
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
          {noticiasHandball.map((noticia) => (
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
                    onClick={() => onDeleteNoticiaHandball(noticia.id)}
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

export default NoticiaHandballRender;
