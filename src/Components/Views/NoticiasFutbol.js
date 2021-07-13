import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
const NoticiasFutbol = () => {
  const [noticiasFutbol, setNoticiasFutbol] = useState([]);
  const [CurrentId, setCurrentId] = useState();
  const getNoticiasFutbol = async () => {
    await db
      .collection("Noticias-Futbol")
      .orderBy("Date", "desc")
      .limit(4)
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasFutbol(docs);
      });
  };
  useEffect(() => {
    getNoticiasFutbol();
  });
  const getNoticiaFutbolIndividual = async () => {
    try {
      if (CurrentId) {
        const data = await db
          .collection("Noticias-futbol")
          .doc(CurrentId)
          .get();
          console.log(data.id)
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <div className="col-md-4 p-2">
          {noticiasFutbol.map((noticia) => (
            <div className="card-mb-1" key={noticia.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  {noticia.NoticiaFutbolImg && (
                    <img
                      src={noticia?.NoticiaFutbolImg}
                      style={{ width: "50%" }}
                      alt="sample"
                      onClick={getNoticiaFutbolIndividual}
                    />
                  )}
                  <Link to={"./noticiafutbol/" + noticia.id}>
                    <h4 onClick={() =>setCurrentId}>{noticia.Title}</h4>

                    <p>{noticia.Body}</p>
                    <p>{noticia.Copete}</p>
                    <p>{noticia.Description}</p>
                    <p>{noticia.Fuente}</p>
                    <p>{noticia.Fecha}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NoticiasFutbol;
