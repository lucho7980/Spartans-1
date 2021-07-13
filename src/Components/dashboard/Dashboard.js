import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h3>Lorem ipsum dolor sit amet.</h3>
      <Link to="/dashboard/noticiasgeneral">
        <h2>Noticias generales</h2>
      </Link>
      <Link to="/dashboard/noticiasfutbol">
        <h2>Noticias de futbol</h2>
      </Link>
      <Link to="/dashboard/noticiasvoley">
        <h2>Noticias de Voley</h2>
      </Link>
      <Link to="/dashboard/noticiashandball">
        <h2>Noticias de Handball</h2>
      </Link>
      <Link to="/dashboard/noticiasbasket">
        <h2>Noticias de Basket</h2>
      </Link>
      <Link to="/dashboard/noticiasfisico">
        <h2>Noticias de Fisicoculturismo</h2>
      </Link>
      <Link to="/dashboard/partidosvoley">
        <h2>Partidos de Voley</h2>
      </Link>
      
      <Link to="/dashboard/partidosfutbol">
        <h2>Partidos de Futbol</h2>
      </Link>
      <Link to="/dashboard/partidoshandball">
        <h2>Partidos de Handball</h2>
      </Link>
      <Link to="/dashboard/partidosbasket">
      <h2>Partidos de Basket</h2>
      </Link>
    </div>
  );
};

export default Dashboard;
