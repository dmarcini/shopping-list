import React from "react";

import FirstShoppingList from "../FirstShoppingList/FirstShoppingList";
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
      shouldRenderFirstShoppingList: false,
      shouldRenderListNameModal: false,
      shouldRenderShoppingList: false,
      listName: "",
      list: null
    }
  }

  renderFirstShoppingList() {
    return <FirstShoppingList/>
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
        onClickShowList={(event) => {this.handleClickShowList(event, list.id)}}
        onClickEditTitle={this.handleClickEditTitle}
        onClickRemoveList={this.handleClickRemoveList}
      />
    ));
  }

  render() {
    if (this.state.shouldRenderFirstShoppingList) {
      return this.renderFirstShoppingList();
    }

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

  handleClickShowList = (event, id) => {
    const list = LocalStorageManager.getShoppingList(id);

    this.setState({
      shouldRenderShoppingList: true,
      list: list
    });
  }

  handleClickRemoveList = (event, id) => {
    event.stopPropagation();

    LocalStorageManager.removeShoppingList(id);

    if (LocalStorageManager.getShoppingLists().length === 0) {
      this.setState({shouldRenderFirstShoppingList: true});
    }

    this.setState({shouldRenderShoppingList: false});
  }

  handleClickAddList = () => {
    this.setState({
      shouldRenderFirstShoppingList: false,
      shouldRenderListNameModal: true
    });
  }

  handleClickModal = () => {
    const newList = new ShoppingListModel(this.state.listName);

    LocalStorageManager.addShoppingList(newList);

    this.setState({
      shouldRenderFirstShoppingList: false,
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
