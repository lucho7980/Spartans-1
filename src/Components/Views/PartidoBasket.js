import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
//import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from "../../assets/img/Basquebolista-mujer.jpg";
import BarraNavegacion from "../Views/BarraNavegacion";
import Footer from "../Views/Footer";

//CSS
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/fonts/font-awesome.min.css";
import "../../assets/fonts/ionicons.min.css";
import "../../assets/css/Article-Clean.css";
import "../../assets/css/Article-Dual-Column.css";
import "../../assets/css/Article-List.css";
import "../../assets/css/Footer-Dark.css";
import "../../assets/css/Navigation-with-Button.css";
import "../../assets/css/Projects-Clean.css";
import "../../assets/css/Social-Icons.css";
import "../../assets/css/styles.css";

const PartidoBasket = () => {
  const [partidosBasket, setPartidosBasket] = useState([]);
  const [CurrentId, setCurrentId] = useState("");
  const getPartidosBasket = async () => {
    await db
      .collection("Partidos-Basket")
      .orderBy("Date", "desc")
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPartidosBasket(docs);
      });
  };
  useEffect(() => {
    getPartidosBasket();
  });
  const getPartidoBasketIndividual = async () => {
    try {
      if (CurrentId) {
        const data = await db
          .collection("Partidos-Basket")
          .doc(CurrentId)
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
      <header style={{ marginLeft: "-11px"}}>
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
                //fontSize: "60px"
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
              src={Background}
              style={{ position: "relative", zIndex: "1", width: "100%" }}
              alt="Partidos Basket"
            />
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-light">Proximos Partidos</h2>
          </div>
        </div>
        <div className="row no-gutters row-cols-3">
          {partidosBasket.map((partido) => (
            <div
              className="col-auto col-sm-3 col-md-3 col-lg-3 col-xl-3 order-1 p-5"
              key={partido.id}
            >
              <div>
                {partido.imgA && (
                  <img
                    className="img-fluid d-inline-block"
                    src={partido?.imgA}
                    alt="Partido Basket"
                  />
                )}
              </div>
              <h4
                onClick={getPartidoBasketIndividual}
                className="text-break text-center text-light"
              >
                {partido.Equipo_1} vs {partido.Equipo_2}
              </h4>
              <p className="text-center text-white">{partido.Fecha_Partido}</p>
              <Link to={"./partidobasket/" + partido.id}>
                <h4 onClick={() => setCurrentId}> ir al evento</h4>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default PartidoBasket;
