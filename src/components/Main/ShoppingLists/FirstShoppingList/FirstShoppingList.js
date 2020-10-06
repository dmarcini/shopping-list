import * as React from "react";

import {
  ReactComponent as ListImage
} from "../../../../assets/icons/shopping-list.svg"; 

import Modal from "./Modal/Modal"

import "./FirstShoppingList.css";
import ShoppingList from "../ShoppingList/ShoppingList";

class FirstShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderModal: false,
      shouldRenderShoppingList: false,
      listName: ""
    }
  }

  renderModal() {
    return (
      <Modal value={this.state.listName} 
             onChange={this.state.handleChange}
             onClick={this.handleClickModal}/>
    );
  }

  renderShoppingList() {
    return (
      <ShoppingList listName={this.state.listName}/>
    )
  }

  render() {
    if (this.state.shouldRenderModal) {
      return this.renderModal();
    }

    if (this.state.shouldRenderShoppingList) {
      return this.renderShoppingList();
    }

    return (
      <main>
        <ListImage id="list-img"/>
        <h1>Create your first shopping list</h1>
        <button onClick={this.handleClick}>Create list</button>
      </main>
    );
  }

  handleClick = () => {
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
