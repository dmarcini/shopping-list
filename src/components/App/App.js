import * as React from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";

import "./App.css";

function App() {
  return (
    <div id="app">
      <Header/>
      <Sidebar/>
      <Home/>
    </div>
  );
}

export default App;
