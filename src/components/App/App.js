import * as React from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

import "./App.css";

function App() {
  return (
    <div id="app">
      <Header/>
      <Sidebar/>
      <Main/>
    </div>
  );
}

export default App;
