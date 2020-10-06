import * as React from "react";

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "./Home/Home";
import AddShoppingLists from "./AddShoppingLists/AddShoppingLists";
import UpdateShoppingLists from "./UpdateShoppingLists/UpdateShoppingLists";
import RemoveShoppingLists from "./RemoveShoppingLists/RemoveShoppingLists";
import ShowShoppingLists from "./ShowShoppingLists/ShowShoppingLists";
import RefuseBin from "./RefuseBin/RefuseBin";
import About from "./About/About";

function Main() {
  return (
    <main>
      <Switch>
        <Route path="/home"
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
        <Redirect to="/home"></Redirect>
      </Switch>
    </main>
  );
}

export default Main;
