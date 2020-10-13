import * as React from "react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "./Home/Home";
import ShoppingLists from "./ShoppingLists/Lists";
import RefuseBin from "./RefuseBin/RefuseBin";

function Main() {
  return (
    <Switch>
      <Route
        path="/home"
        component={Home} exact
      />
      <Route
        path="/shopping-lists"
        component={ShoppingLists} exact
      />
      <Route
        path="/refuse-bin"
        component={RefuseBin} exact
      />
      <Redirect to="/home"></Redirect>
    </Switch>
  );
}

export default Main;
