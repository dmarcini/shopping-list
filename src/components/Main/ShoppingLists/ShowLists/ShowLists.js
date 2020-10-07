import React from "react";

import ListNameModal from "../ListNameModal/ListNameModal";
import ShoppingList from "../ShoppingList/ShoppingList";

import LocalStorageManager from "../..//../../js/localStorageManager";
import { ShoppingListModel } from "../../../../js/shoppingList";

import "./ShowLists.css";

class ShowLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderListNameModal: false,
      shouldRenderShoppingList: false,
      listName: "",
      list: null
    }
  }

  renderListNameModal() {
    return (
      <ListNameModal 
        value={this.state.listName}
        onClick={this.handleClickModal}
        onChange={this.handleChange}
      />
    );
  }

  renderShoppingList() {
    return (
      <ShoppingList list={this.state.list}/>
    );
  }

  renderLists() {
    const lists = LocalStorageManager.getShoppingLists();

    return lists.map(list => (
      <div
        key={list.id}
        className="list"
        onClick={this.handleClickShowList}
      >
        <h1 className="list-title">
          {list.title}
          <button
            className="list-title-edit"
            title="Edit list title"
            onClick={this.handleClickEditTitle}
          >
            <span className="fas fa-edit"></span>
          </button>
        </h1>
        <span className="list-length">0 / {list.items.length}</span>
        <button 
          className="list-remove"
          onClick={(event) => this.handleClickRemoveList(event, list.id)}
        >
          <span className="fa fa-trash"></span>
        </button>
         <div className="line"></div>
      </div>
    ));
  }

  render() {
    if (this.state.shouldRenderListNameModal) {
      return this.renderListNameModal();
    }

    if (this.state.shouldRenderShoppingList) {
      return this.renderShoppingList();
    }

    return (
      <div id="lists">
        {this.renderLists()}
        <button
          id="add-list"
          onClick={this.handleClickAddList}
        >
          <span className="fas fa-plus"></span>
        </button>
      </div>
    );
  }

  handleClickShowList = () => {

  }

  handleClickRemoveList = (event, id) => {
    this.setState({
      shouldRenderShoppingList: false
    });

    LocalStorageManager.removeShoppingList(id);
  }

  handleClickEditTitle = () => {

  }

  handleClickAddList = () => {
    this.setState({shouldRenderListNameModal: true});
  }

  handleClickModal = () => {
    const newList = new ShoppingListModel(this.state.listName);

    LocalStorageManager.addShoppingList(newList);

    this.setState({
      shouldRenderListNameModal: false,
      shouldRenderShoppingList: true,
      list: newList
    });
  }

  handleChange = (event) => {
    this.setState({listName: event.target.value});
  }
}

export default ShowLists;
