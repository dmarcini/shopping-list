import * as React from "react";

import ShoppingList from "./ShoppingList/ShoppingList";
import FirstShoppingList from "./FirstShoppingList/FirstShoppingList";

import LocalStorageManager from "../../../js/localStorageManager";

import "./ShoppingLists.css";

class ShoppingLists extends React.Component {
  render() {
    if (LocalStorageManager.getShoppingLists().length <= 1) {
      return <FirstShoppingList/>
    }

    return (
      <ShoppingList/>
    )
  }
}

export default ShoppingLists;
