import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/styles.css";

const Barradenavegacion = () => {
  return (
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
  );
};

export default Barradenavegacion;
