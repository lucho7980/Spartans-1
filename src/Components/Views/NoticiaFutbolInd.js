import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { db } from "../../config/firebase";

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

const NoticiaFutbolInd = () => {
  const { id } = useParams();
  /*  const [noticia,setNoticia]= useState([]); */
  const [Title, setTitle] = useState("");
  const [Body, setBody] = useState("");
  const [Copete, setCopete] = useState("");
  const [Fecha, setFecha] = useState("");
  const [NoticiaFutbolImg, setNoticiaFutbolImg] = useState("");
  const [Fuente, setFuente] = useState("");
  const getNoticiaFutbolIndividual = async () => {
    await db
      .collection("Noticias-Futbol")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          /*     setNoticia(doc) */
          setTitle(doc.data().Title);
          setBody(doc.data().Body);
          setCopete(doc.data().Copete);
          setFecha(doc.data().Fecha);
          setNoticiaFutbolImg(doc.data().NoticiaFutbolImg);
          setFuente(doc.data().Fuente);
          console.log("Document data:", Body, NoticiaFutbolImg);
        } else {
          console.log("No matchs");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

  };
  useEffect(() => {
    getNoticiaFutbolIndividual();
  });
  return (
    <>
      <Navbar
        className="fixed-top float-right"
        collapseOnSelect
        expand="md"
        variant="dark"
        style={{ backgroundColor: "rgb(26, 26, 26)" }}
      >
        <Navbar.Brand as={NavLink} to="/">Spartans</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/noticiasgeneral">Noticias</Nav.Link>
            <Nav.Link as={NavLink} to="/deportistadelmes">Ranking</Nav.Link>
            <NavDropdown title="Deportes">
              <NavDropdown.Item as={NavLink} to="/noticiasfutbol">Football</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiasbasket">Basket</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiasvoley">Voley</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiasfisico">Fisicoculturismo</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiashandball">Handball</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {
        <div
          className="article-clean"
          style={{ backgroundColor: "rgb(26, 26, 26)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
                <div className="text-light intro">
                  <h1
                    className="text-center"
                    style={{ letterSpacing: "0px", fontSize: "42px" }}
                  >
                    {Title}
                  </h1>
                  <p className="text-light">{Copete}</p>
                  <img
                    className="img-fluid"
                    src={NoticiaFutbolImg}
                    alt="Imagen Futbol"
                  />
                </div>
                <div className="text">
                  <p
                    className="text-light flex-grow-1"
                    style={{ fontSize: "21px" }}
                  >
                    {Body}
                  </p>
                  <figure>
                    <img
                      className="figure-img"
                      src="/assets/img/beach.jpg"
                      alt="Beach"
                    />
                  </figure>
                  <p className="text-center" style={{ fontSize: "15px" }}>
                    <span className="text-light date">{Fecha}</span>
                    <span className="text-light by">&nbsp;by {Fuente}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default NoticiaFutbolInd;
