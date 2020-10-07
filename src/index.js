import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App/App";

import * as serviceWorker from "./js/serviceWorker";
import LocalStorageManager from "./js/localStorageManager";

import "./css/index.css";
import "./css/fontawesome/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

localStorage.removeItem("shoppingLists");

if (localStorage.getItem("shoppingLists") === null) {
  localStorage.setItem("shoppingLists",
                       JSON.stringify(new LocalStorageManager()));
}

//alert(localStorage.getItem("shoppingLists"));

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);

serviceWorker.unregister();
