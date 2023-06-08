import React from "react";
import style from "../Style/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={style.Navbar}>
      <Link to="/">Home</Link>
      <Link to="/">Your</Link>
      <Link to="/">All</Link>
      <Link to="/">Blocked</Link>
    </div>
  );
};

export default Navbar;
