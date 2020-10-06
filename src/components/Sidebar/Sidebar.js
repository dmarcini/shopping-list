import * as React from "react";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside>
      <Navbar/>
      <Footer/>
    </aside>
  );
}

export default Sidebar;
