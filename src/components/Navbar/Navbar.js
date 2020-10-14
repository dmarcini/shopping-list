import React from "react";

import Header from "../Header/Header"
import NavbarItem from "./NavbarItem/NavbarItem";

import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <Header/>
      <h1>Manage your shopping lists</h1>
      <ul>
        <NavbarItem
          to="/shopping-lists"
          icon="icon fas fa-cart-plus"
        >
          Shopping lists
        </NavbarItem>
        <NavbarItem
          to="refuse-bin"
          icon="icon fa fa-trash"
        >
          Refuse bin
        </NavbarItem>
      </ul>
    </nav>
  );
}

export default Navbar;
