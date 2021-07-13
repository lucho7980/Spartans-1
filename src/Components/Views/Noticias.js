import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";

const Noticias = () => {
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
  useEffect(() => {
    getNoticias();
  });
  const getNoticiaIndividual = async (noticiaObject) => {
    try {
      if (currentId) {
        const data = await db
          .collection("Noticias-general")
          .doc(currentId)
          .get();
        console.log(data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <div className="col-md-4 p-2">
          {noticias.map((noticia) => (
            <div className="card-mb-1" key={noticia.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  {noticia.imgA && (
                    <img
                      src={noticia?.imgA}
                      style={{ width: "50%" }}
                      alt="sample"
                      onClick={getNoticiaIndividual}
                    />
                  )}
                  {noticia.imgB && (
                    <img
                      src={noticia?.imgB}
                      style={{ width: "50%" }}
                      alt="sample"
                      onClick={getNoticiaIndividual}
                    />
                  )}
                  <Link to={"./noticia/" + noticia.id}>
                    <h4 onClick={() => setCurrentId(noticia.id)}>
                      {noticia.Title}
                    </h4>

                    <p>{noticia.Body.substring(0, 100)}</p>

                    <p>{noticia.Copete}</p>
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

export default Noticias;
