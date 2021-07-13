import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import BarraNavegacion from "../Views/BarraNavegacion";
import Footer from "../Views/Footer";
const NoticiasVoley = () => {
  const [noticiasVoley, setNoticiasVoley] = useState([]);
  const getNoticiasVoley = async () => {
    await db
      .collection("Noticias-Voley")
      .orderBy("Date", "desc")
      .limit(4)
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasVoley(docs);
      });
  };
  useEffect(() => {
    getNoticiasVoley();
  });
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
          {noticiasVoley.map((noticia) => (
            <div className="col-sm-6 col-md-3 item" key={noticia.id}>
              {noticia.NoticiaVoleyImg && (
                <img
                  src={noticia?.NoticiaVoleyImg}
                  style={{ width: "50%" }}
                  alt="sample"
                />
              )}
                <h3 className="text-white">{noticia.Title}</h3>
                <p>{noticia.Body.substring(0, 100)}</p>
                <Link to={"./noticiavoley/" + noticia.id}>
                <p>Leer Mas</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NoticiasVoley;
