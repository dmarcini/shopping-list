import * as React from "react";
import { Container, Row } from "react-bootstrap";

import "./ListNameModal.css";

function ListNameModal(props) {
  return (
    <Container id="modal">
      <Row>
        <h1>Name for new lists:</h1>
      </Row>
      <Row>
        <input type="text" value={props.listName}
               onChange={props.onChange}
               placeholder="New list" autoFocus
        />
      </Row>
      <Row>
        <button onClick={props.onClick}>Create</button>
      </Row>
    </Container>
  );
}

export default ListNameModal;
