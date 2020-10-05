import * as React from "react";
import {Link} from "react-router-dom";

import "./NavbarItem.css";

function NavbarItem(props) {
  return (
    <li className="nav-item">
      <Link to={props.to}>
        <span className={props.class + " icon"}></span>
        {props.children}
      </Link>
    </li>
  )
}

export default NavbarItem;
