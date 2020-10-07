import * as React from "react";

import FirstShoppingList from "./FirstShoppingList/FirstShoppingList";
import ShowLists from "./ShowLists/ShowLists";

import LocalStorageManager from "../../../js/localStorageManager";

import "./ShoppingLists.css";

class ShoppingLists extends React.Component {
  render() {
    if (LocalStorageManager.getShoppingLists().length <= 1) {
      return <FirstShoppingList/>
    }

    return (
      <ShowLists/>
    )
  }
}

export default ShoppingLists;
