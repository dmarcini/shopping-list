import React from "react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ShoppingLists from "./ShoppingLists/Lists";
import RefuseBin from "./RefuseBin/RefuseBin";

function Main() {
  return (
    <Switch>
      <Route
        path="/shopping-lists"
        component={ShoppingLists}
        exact
      />
      <Route
        path="/refuse-bin"
        component={RefuseBin}
        exact
      />
      <Redirect to="/shopping-lists"></Redirect>
    </Switch>
  );
}

export default Main;
