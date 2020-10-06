import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

import "./App.css";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Header/>
        <Sidebar/>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
