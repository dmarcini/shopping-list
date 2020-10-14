import React from "react";

import FirstListDialog from "./FirstListDialog/FirstListDialog";
import ListNameModal from "./ListNameModal/ListNameModal";
import List from "./List/List";

import LocalStorageManager from "../../../js/localStorageManager";
import { ShoppingListModel } from "../../../js/shoppingList";

import "./Lists.css";

class Lists extends React.Component {
  constructor(props) {
    super(props);

    const shouldRenderFirstListDialog =
      LocalStorageManager.getShoppingLists().length === 0;

    this.state = {
      shouldRenderFirstListDialog: shouldRenderFirstListDialog,
      shouldRenderListNameModal: false,
      listName: "",
      listChangeSwitch: false
    }
  }

  renderFirstListDialog() {
    return <FirstListDialog onClick={this.handleClickCreateFirstList}/>
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

  renderLists() {
    return (
      <div id="lists">
        {LocalStorageManager.getShoppingLists().map(list => (
          <List
            key={list.id}
            list={list}
            listType="actual"
            onClickRemoveList={this.handleClickRemoveList}
          />
        ))} 
        <button
          id="add-list"
          onClick={this.handleClickAddList}
        >
          <span className="fas fa-plus"></span>
        </button>
      </div>
    );
  }

  render() {
    if (this.state.shouldRenderFirstListDialog) {
      return this.renderFirstListDialog();
    }

    if (this.state.shouldRenderListNameModal) {
      return this.renderListNameModal();
    }

    return this.renderLists();
  }

  handleClickCreateFirstList = () => {
    this.setState({
      shouldRenderFirstListDialog: false,
      shouldRenderListNameModal: true
    });
  }

  handleClickRemoveList = (event, id) => {
    event.stopPropagation();

    LocalStorageManager.removeShoppingList(id);

    if (LocalStorageManager.getShoppingLists().length === 0) {
      this.setState({shouldRenderFirstListDialog: true});
    }

    this.setState((state) => ({
      listChangeSwitch: !state.listChangeSwitch
    }))
  }

  handleClickAddList = () => {
    this.setState({
      shouldRenderListNameModal: true
    });
  }

  handleClickModal = () => {
    const newList = new ShoppingListModel(this.state.listName);

    LocalStorageManager.addShoppingList(newList);

    this.setState({
      shouldRenderFirstListDialog: false,
      shouldRenderListNameModal: false
    });
  }

  handleChange = (event) => {
    this.setState({listName: event.target.value});
  }
}

export default Lists;
