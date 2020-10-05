import * as React from "react";
import {NavLink} from "react-router-dom";

import "./NavbarItem.css";

function NavbarItem(props) {
  return (
    <li className="nav-item">
      <NavLink to={props.to}
               activeClassName="active">
        <span className={props.class + " icon"}></span>
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavbarItem;
