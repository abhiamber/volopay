import React from "react";
import style from "../Style/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={style.Navbar}>
      <Link to="/">Home</Link>
      <Link to="/your">Your</Link>
      <Link to="/all">All</Link>
      <Link to="/blocked">Blocked</Link>
    </div>
  );
};

export default Navbar;
