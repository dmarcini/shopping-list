import React from "react";

import ListNameModal from "../ListNameModal/ListNameModal";
import ShoppingList from "../ShoppingList/ShoppingList";
import ShowList from "../ShowList/ShowList";

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
      <ShowList
        key={list.id}
        list={list}
        listType="actual"
        onClickShowList={this.handleClickShowList}
        onClickEditTitle={this.handleClickEditTitle}
        onClickRemoveList={this.handleClickRemoveList}
      />
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
