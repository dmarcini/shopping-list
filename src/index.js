import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App/App";

import * as serviceWorker from "./js/serviceWorker";
import LocalStorageManager from "./js/localStorageManager";

import {ShoppingListItemModel} from "./js/shoppingList";
import {ShoppingListModel} from "./js/shoppingList";

import "./css/index.css";
import "./css/fontawesome/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
/*
localStorage.removeItem("shoppingLists");

if (localStorage.getItem("shoppingLists") === null) {
  localStorage.setItem("shoppingLists",
                       JSON.stringify(new LocalStorageManager()));
}

const item1 = new ShoppingListItemModel("item1");
const item2 = new ShoppingListItemModel("item2");
const list1 = new ShoppingListModel("list1", [item1, item2]);
LocalStorageManager.addShoppingList(list1);

const item3 = new ShoppingListItemModel("item1");
const item4 = new ShoppingListItemModel("item2");
const item5 = new ShoppingListItemModel("item3");
const item6 = new ShoppingListItemModel("item4");
const list2 = new ShoppingListModel("list2", [item3, item4, item5, item6]);
LocalStorageManager.addShoppingList(list2);
*/
//alert(localStorage.getItem("shoppingLists"));

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);

serviceWorker.unregister();
