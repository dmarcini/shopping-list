import * as React from "react";
import { Container, Row } from "react-bootstrap";

import {
  ReactComponent as ListImage
} from "../../../../assets/icons/shopping-list.svg"; 

import ShoppingList from "../ShoppingList/ShoppingList";
import ListNameModal from "../ListNameModal/ListNameModal"

import "./FirstShoppingList.css";
import LocalStorageManager from "../../../../js/localStorageManager";

class FirstShoppingList extends React.Component {
  constructor(props) {
    super(props);

    const isFirstList = LocalStorageManager.getShoppingLists().length <= 1;

    this.state = {
      shouldRenderShoppingList: !isFirstList,
      shouldRenderModal: false,
      listName: ""
    }
  }

  renderShoppingList() {
    return (
      <ShoppingList listName={this.state.listName}/>
    )
  }

  renderModal() {
    return (
      <ListNameModal value={this.state.listName} 
                     onChange={this.handleChange}
                     onClick={this.handleClickModal}
      />
    );
  }

  renderFirstShoppingList() {
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
            <button onClick={this.handleClickCreateList}>Create list</button>
          </Row>
        </Container>
      </main>
    );
  }

  render() {
    if (this.state.shouldRenderShoppingList) {
      return this.renderShoppingList();
    }

    if (this.state.shouldRenderModal) {
      return this.renderModal();
    }

    return this.renderFirstShoppingList();
  }

  handleClickCreateList = () => {
    this.setState({shouldRenderModal: true});
  }

  handleClickModal = () => {
    this.setState({
      shouldRenderModal: false,
      shouldRenderShoppingList: true
    });
  }

  handleChange = (event) => {
    this.setState({listName: event.target.value});
  }
}

export default FirstShoppingList;
