import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import BarraNavegacion from "../Views/BarraNavegacion";
import Footer from "../Views/Footer";

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
      <BarraNavegacion />
      <header style={{ marginLeft: "-11px" }}>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            marginRight: "-22px",
            backgroundColor: "rgba(26,26,26)",
          }}
        >
          <div>
            <h1
              className="text-light"
              style={{
                paddingTop: "20px",
                position: "absolute",
                zIndex: "2",
                marginLeft: "30px",
              }}
            >
              Titulo Noticia
            </h1>
            <p
              className="text-white"
              style={{
                marginTop: "54px",
                marginLeft: "30px",
                position: "absolute",
                zIndex: "3",
              }}
            >
              Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
              odio, dapibus ac facilisis in, egestas eget quam.
            </p>
            <img
              className="img-fluid"
              style={{ position: "relative", zIndex: "1", width: "100%" }}
              alt="Partidos Basket"
            />
          </div>
        </div>
      </header>
      <div
        className="article-list"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="container">
          <div className="row article">
            {noticias.map((noticia) => (
              <div className="col-sm-6 col-md-3 item" key={noticia.id}>
                  {noticia.imgA && (
                    <img
                      src={noticia?.imgA}
                      className="img-fluid"
                      alt="sample"
                      onClick={getNoticiaIndividual}
                    />
                  )}
                  {noticia.imgB && (
                    <img
                      src={noticia?.imgB}
                      className="img-fluid"
                      alt="sample"
                      onClick={getNoticiaIndividual}
                    />
                  )}
                  <h3 className="text-white" onClick={() => setCurrentId(noticia.id)}>
                    {noticia.Title}
                  </h3>
                  <p>{noticia.Body.substring(0, 100)}</p>
                  <Link to={"./noticia/" + noticia.id}>
                    <p>Leer Mas</p>
                  </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Noticias;
