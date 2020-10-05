import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App/App";

import "./css/index.css";
import "./css/fontawesome/all.min.css";

import * as serviceWorker from "./js/serviceWorker";

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);

serviceWorker.unregister();
