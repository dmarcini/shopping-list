import * as React from "react";

import "./Modal.css";

function Modal(props) {
  return (
    <div id="modal">
      <h1>Name for new lists</h1>
      <input type="text" 
             value={props.listName}
             onChange={props.onChange}></input>
      <button onClick={props.onClick}>Create</button>
    </div>
  );
}

export default Modal;
