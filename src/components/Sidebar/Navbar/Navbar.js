import * as React from "react";

import NavbarItem from "./NavbarItem/NavbarItem";

import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <h1>Manage your shopping lists</h1>
      <ul>
        <NavbarItem to="/home" class="fas fa-home">
          Home
        </NavbarItem>
        <NavbarItem to="/add-shopping-lists" class="fas fa-cart-plus">
          Add shopping lists
        </NavbarItem>
        <NavbarItem to="/update-shopping-lists" class="fas fa-edit">
          Update shopping lists
        </NavbarItem>
        <NavbarItem to="/remove-shopping-lists" class="fas fa-minus-circle">
          Remove shopping lists
        </NavbarItem>
        <NavbarItem to="show-shopping-lists" class="fas fa-list">
          Show shopping lists
        </NavbarItem>
        <NavbarItem to="refuse-bin" class="fa fa-trash">
          Refuse bin
        </NavbarItem>
        <NavbarItem to="about" class="fas fa-info-circle">
          About
        </NavbarItem>
      </ul>
    </nav>
  );
}

export default Navbar;
