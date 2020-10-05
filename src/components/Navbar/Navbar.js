import * as React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import NavbarItem from "../NavbarItem/NavbarItem";
import Home from "../Home/Home";
import AddShoppingLists from "../AddShoppingLists/AddShoppingLists";
import UpdateShoppingLists from "../UpdateShoppingLists/UpdateShoppingLists";
import RemoveShoppingLists from "../RemoveShoppingLists/RemoveShoppingLists";
import ShowShoppingLists from "../ShowShoppingLists/ShowShoppingLists";
import RefuseBin from "../RefuseBin/RefuseBin";
import About from "../About/About";

import "./Navbar.css";

function Navbar() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Manage your shopping lists</h1>
        <ul>
          <NavbarItem to="/" class="fas fa-home">
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
        <Switch>
          <Route path="/"
                 component={Home} exact>
          </Route>
          <Route path="/add-shopping-lists"
                 component={AddShoppingLists} exact>
          </Route>
          <Route path="/update-shopping-lists"
                 component={UpdateShoppingLists} exact>
          </Route>
          <Route path="/remove-shopping-lists"
                 component={RemoveShoppingLists} exact>
          </Route>
          <Route path="/show-shopping-lists"
                 component={ShowShoppingLists} exact>
          </Route>
          <Route path="/refuse-bin"
                 component={RefuseBin} exact>
          </Route>
          <Route path="/about"
                 component={About} exact>
          </Route>
        </Switch>
      </nav>
    </BrowserRouter>
  );
}

export default Navbar;
