import * as React from "react";

import NavbarItem from "../NavbarItem/NavbarItem";

import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <h1>Manage your shopping lists</h1>
      <ul>
        <NavbarItem href="" class="fas fa-cart-plus">
          Add shopping list
        </NavbarItem>
        <NavbarItem href="" class="fas fa-edit">
          Update shopping list
        </NavbarItem>
        <NavbarItem href="" class="fas fa-minus-circle">
          Remove shopping list
        </NavbarItem>
        <NavbarItem href="" class="fas fa-list">
          Show shopping lists
        </NavbarItem>
        <NavbarItem href="" class="fa fa-trash">
          Refuse bin
        </NavbarItem>
        <NavbarItem href="" class="fas fa-info-circle">
          About
        </NavbarItem>
      </ul>
    </nav>
  );
}

export  default Navbar;
