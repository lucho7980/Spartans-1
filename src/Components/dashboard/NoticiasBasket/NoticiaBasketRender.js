import React, { useEffect, useState } from "react";
import NoticiaFutbolForm from "./NoticiaBasketForm";
import { db } from "../../../config/firebase";
const NoticiaBasketRender = () => {

  const [noticiasBasket, setNoticiasBasket] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticiasBasket = async () => {
    await db
      .collection("Noticias-Basket")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasBasket(docs);
      });
  };
  const onDeleteNoticiaBasket = async (id) => {
    if (window.confirm("Seguro que deseas eliminar la noticia?")) {
      await db.collection("Noticias-Basket").doc(id).delete();
    }
  };
  const addOrEditNoticiaBasket = async (noticiaBasketObject) => {
    try {
      if (currentId === "") {
        await db.collection("Noticias-Basket").doc().set(noticiaBasketObject);
        console.log(noticiaBasketObject);
      } else {
        await db
          .collection("Noticias-Basket")
          .doc(currentId)
          .update(noticiaBasketObject);
        setCurrentId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoticiasBasket();
  });
  return (
    <>
      <div className="col-12 p-2">
        <NoticiaFutbolForm
          {...{ addOrEditNoticiaBasket, currentId, noticiasBasket }}
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
          {noticiasBasket.map((noticia) => (
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
                    onClick={() => onDeleteNoticiaBasket(noticia.id)}
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

export default NoticiaBasketRender;
