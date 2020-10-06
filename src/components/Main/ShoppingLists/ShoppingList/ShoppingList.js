import * as React from "react";

import AddItem from "../AddItem/AddItem";

import {
  ShoppingListModel,
  ShoppingListItemModel
} from "../../../../js/shoppingList";

import LocalStorageManager from "../../../../js/localStorageManager";

import "./ShoppingList.css";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [new ShoppingListItemModel("")]
    }
  }

  renderAddItem(id, value) {
    return (
      <AddItem id={id} key={id} value={value}
               onChange={this.handleChangeItem}
               onClick={this.handleRemoveClick}
      />
    );
  }

  render() {
    const items = this.state.items.map((item) => {
      return this.renderAddItem(item.id, item.name)
    });

    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.props.listName}</h1>
          <div id="items-group">
            {items}
            <button id="add-item" type="button"
                    onClick={this.handleClick}>+</button>
            <button id="submit" type="submit">Save</button>
          </div>
        </form>
      </section>
    ) 
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const shoppingList = new ShoppingListModel(this.state.name,
                                              this.state.items);

    this.setState({
      items: [new ShoppingListItemModel("")]
    });

    LocalStorageManager.addShoppingList(shoppingList);
  }

  handleChangeItem = (event, id) => {
    const items = [...this.state.items];

    items.find(item => item.id === id).name = event.target.value;

    this.setState({items: items});
  }

  handleClick = (event) => {
    event.preventDefault();

    const items = [...this.state.items, new ShoppingListItemModel("")];

    this.setState({items: items});
  }

  handleRemoveClick = (event, id) => {
    event.preventDefault();

    const items = this.state.items.filter(item => item.id !== id);

    this.setState({items: items});
  }
}

export default ShoppingList;
