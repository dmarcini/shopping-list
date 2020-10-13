import * as React from "react";
import { Container, Row } from "react-bootstrap";

import {
  ReactComponent as ListImage
} from "../../../../assets/icons/shopping-list.svg"; 

import "./FirstListDialog.css";

class FirstListDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: "",
      list: null
    }
  }

  render() {
    return (
      <main>
        <Container>
          <Row>
            <ListImage id="list-img"/>
          </Row>
          <Row>
            <h1>Create your first shopping list</h1>
          </Row>
          <Row>
            <button onClick={this.props.onClick}>
              Create list
            </button>
          </Row>
        </Container>
      </main>
    );
  }
}

export default FirstListDialog;
