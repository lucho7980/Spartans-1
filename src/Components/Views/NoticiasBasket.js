import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { db } from "../../config/firebase";
//CSS
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/fonts/font-awesome.min.css";
import "../../assets/fonts/ionicons.min.css";
import "../../assets/css/Article-Clean.css";
import "../../assets/css/Article-Dual-Column.css";
import "../../assets/css/Article-List.css";
import "../../assets/css/Footer-Dark.css";
import "../../assets/css/Projects-Clean.css";
import "../../assets/css/Social-Icons.css";
import "../../assets/css/styles.css";

const NoticiasBasket = () => {
  const [noticiasBasket, setNoticiasBasket] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getNoticiasBasket = async () => {
    await db
      .collection("Noticias-Basket")
      .orderBy("Date", "desc")
      .limit(4)
      .onSnapshot((querysnapshot) => {
        const docs = [];
        querysnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setNoticiasBasket(docs);
      });
  };
  useEffect(() => {
    getNoticiasBasket();
  });
  const getNoticiaBasketIndividual = async (noticiaObject) => {
    try {
      if (currentId) {
        const data = await db
          .collection("Noticias-Basket")
          .doc(currentId)
          .get();
        console.log(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar
        className="fixed-top float-right"
        collapseOnSelect
        expand="md"
        variant="dark"
        style={{ backgroundColor: "rgb(26, 26, 26)" }}
      >
        <Navbar.Brand as={NavLink} to="/">
          Spartans
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/noticiasgeneral">
              Noticias
            </Nav.Link>
            <Nav.Link as={NavLink} to="/deportistadelmes">
              Ranking
            </Nav.Link>
            <NavDropdown title="Deportes">
              <NavDropdown.Item as={NavLink} to="/noticiasfutbol">
                Football
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiasbasket">
                Basket
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiasvoley">
                Voley
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiasfisico">
                Fisicoculturismo
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/noticiashandball">
                Handball
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            backgroundColor: "rgba(255,255,255,0.3)",
            backgroundSize: "auto",
          }}
        >
          <h1>Titulo Noticia</h1>
          <p>
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam.
          </p>
          <p>
            <Link to="/" className="btn btn-outline-dark" role="button">
              Learn more
            </Link>
          </p>
        </div>
      </header>
      <div
        className="article-list"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="container">
          <div className="row article">
            {noticiasBasket.map((noticia) => (
              <div className="col-sm-6 col-md-4 item" key={noticia.id}>
                {noticia.imgA && (
                  <img
                    className="img-fluid"
                    src={noticia?.imgA}
                    style={{ width: "50%" }}
                    alt="sample"
                    onClick={getNoticiaBasketIndividual}
                  />
                )}
                {noticia.imgB && (
                  <img
                    className="img-fluid"
                    src={noticia?.imgB}
                    style={{ width: "50%" }}
                    alt="sample"
                    onClick={getNoticiaBasketIndividual}
                  />
                )}
                <Link to={"./noticiabasket/" + noticia.id}>
                  <h3
                    className="text-white name"
                    onClick={() => setCurrentId(noticia.id)}
                  >
                    {noticia.Title}
                  </h3>
                  <p className="text-white-50 description">
                    {noticia.Body.substring(0, 100)}
                  </p>
                  <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-dark">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>
                    <Link to="/">Web design</Link>
                  </li>
                  <li>
                    <Link to="/">Development</Link>
                  </li>
                  <li>
                    <Link to="/">Hosting</Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>
                    <Link to="/">Company</Link>
                  </li>
                  <li>
                    <Link to="/">Team</Link>
                  </li>
                  <li>
                    <Link to="/">Careers</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 item text">
                <h3>Company Name</h3>
                <p>
                  Praesent sed lobortis mi. Suspendisse vel placerat ligula.
                  Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam
                  quis tristique lectus. Aliquam in arcu eget velit pulvinar
                  dictum vel in justo.
                </p>
              </div>
              <div className="col item social">
                <Link to="/">
                  <i className="icon ion-social-facebook"></i>
                </Link>
                <Link to="/">
                  <i className="icon ion-social-twitter"></i>
                </Link>
                <Link to="/">
                  <i className="icon ion-social-snapchat"></i>
                </Link>
                <Link to="/">
                  <i className="icon ion-social-instagram"></i>
                </Link>
              </div>
            </div>
            <p className="copyright">Company Name © 2017</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default NoticiasBasket;
