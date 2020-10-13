import React from "react";

import FirstListDialog from "./FirstListDialog/FirstListDialog";
import ListNameModal from "./ListNameModal/ListNameModal";
import ListItems from "./ListItems/ListItems";
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
      listsToItemsRender: [],
      listName: ""
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
    const lists = LocalStorageManager.getShoppingLists();

    return lists.map(list => {
      const shouldRenderListItems =
        this.state.listsToItemsRender.some(listToItemsRender => {
          return listToItemsRender.id === list.id
        });

      let listItems = null;

      if (shouldRenderListItems) {
        listItems = <ListItems list={list}/>
      }

      return (
        <div>
          <List
            key={list.id}
            list={list}
            listType="actual"
            onClickShowList={(event) => {this.handleClickShowList(event, list.id)}}
            onClickEditTitle={this.handleClickEditTitle}
            onClickRemoveList={this.handleClickRemoveList}
          />
          {listItems}
        </div>
      );
      
    });
  }

  render() {
    if (this.state.shouldRenderFirstListDialog) {
      return this.renderFirstListDialog();
    }

    if (this.state.shouldRenderListNameModal) {
      return this.renderListNameModal();
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

  handleClickCreateFirstList = () => {
    this.setState({
      shouldRenderFirstListDialog: false,
      shouldRenderListNameModal: true
    });
  }

  handleClickShowList = (event, id) => {
    const list = LocalStorageManager.getShoppingList(id);
    const areListItemsShown = this.state.listsToItemsRender.some(list => {
      return list.id === id;
    });

    let listsToItemsRender;

    if (!areListItemsShown) {
      listsToItemsRender = [...this.state.listsToItemsRender, list];
    } else {
      listsToItemsRender =
        this.state.listsToItemsRender.filter(list => list.id !== id);
    }

    this.setState({
      shouldRenderShoppingList: true,
      listsToItemsRender: listsToItemsRender
    });
  }

  handleClickRemoveList = (event, id) => {
    event.stopPropagation();

    LocalStorageManager.removeShoppingList(id);

    if (LocalStorageManager.getShoppingLists().length === 0) {
      this.setState({shouldRenderFirstListDialog: true});
    }

    this.setState({shouldRenderShoppingList: false});
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
      shouldRenderListNameModal: false,
      shouldRenderShoppingList: true,
      list: newList
    });
  }

  handleChange = (event) => {
    this.setState({listName: event.target.value});
  }
}

export default Lists;
