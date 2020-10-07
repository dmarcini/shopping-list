import * as React from "react";
import { Container, Row } from "react-bootstrap";

import {
  ReactComponent as ListImage
} from "../../../../assets/icons/shopping-list.svg"; 

import ShoppingList from "../ShoppingList/ShoppingList";
import ListNameModal from "../ListNameModal/ListNameModal";

import LocalStorageManager from "../../../../js/localStorageManager";
import { ShoppingListModel } from "../../../../js/shoppingList";

import "./FirstShoppingList.css";

class FirstShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderShoppingList: false,
      shouldRenderModal: false,
      listName: "",
      list: null
    }
  }

  renderShoppingList() {
    return (
      <ShoppingList list={this.state.list}/>
    )
  }

  renderModal() {
    return (
      <ListNameModal
        value={this.state.listName} 
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
    const newList = new ShoppingListModel(this.state.listName);

    LocalStorageManager.addShoppingList(newList);

    this.setState({
      shouldRenderModal: false,
      shouldRenderShoppingList: true,
      list: newList
    });
  }

  handleChange = (event) => {
    this.setState({listName: event.target.value});
  }
}

export default FirstShoppingList;
