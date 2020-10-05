import * as React from "react";

import "./NavbarItem.css";

function NavbarItem(props) {
  return (
    <li className="nav-item">
      <span className={props.class + " icon"}></span>
      <a href={props.href}>{props.children}</a>
    </li>
  )
}

export default NavbarItem;
