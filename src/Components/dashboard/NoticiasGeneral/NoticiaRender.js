import React, { useEffect, useState } from "react";
import NoticiaForm from './NoticiaForm'
import { db } from "../../../config/firebase";
const NoticiaRender = () => {
  const [noticias, setNoticias] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticias = async () => {
    await db
      .collection("Noticias-general")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticias(docs);
      });
  };
  const onDeleteNoticia = async (id) => {
    if (window.confirm("Seguro que deseas eliminar la noticia?")) {
      await db.collection("Noticias-general").doc(id).delete();
    }
  };
  useEffect(() => {
    getNoticias();
  });
  const addOrEditNoticia = async (noticiaObject) => {
    try {
      if (currentId === "") {
        await db.collection("Noticias-general").doc().set(noticiaObject);
        console.log(noticiaObject);
      } else {
        await db.collection("Noticias-general").doc(currentId).update(noticiaObject);
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="col-12 p-2">
        <NoticiaForm {...{ addOrEditNoticia, currentId, noticias }} />
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
        {noticias.map((noticia) => (
            <tbody key={noticia.id}>
                <tr>
                    <td>{noticia.Fecha}</td>
                    <td>
                        {noticia.Title}
                    </td>
                    <td>{noticia.Copete}</td>
                    <td>{noticia.Body.substring(0, 50)}</td>
                    <td>{noticia.Fuente}</td>
                    <td><button
                    className="btn btn-success"
                    onClick={() => setCurrentId(noticia.id)}
                  >
                    Edit
                  </button></td>
                    <td><button
                    className="btn btn-danger"
                    onClick={() => onDeleteNoticia(noticia.id)}
                  >
                    Delete
                  </button></td>
        
          </tr>
          </tbody>
        ))}
        </table>
      </div>
    </>
  );
};
export default NoticiaRender;
