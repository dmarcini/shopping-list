import * as React from "react";

import AddItem from "./AddItem/AddItem";

import {
  ShoppingList,
  ShoppingListItem
} from "../../../js/shoppingList";

import LocalStorageManager from "../../../js/localStorageManager";

import "./AddShoppingLists.css";

class AddShoppingLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      items: [new ShoppingListItem("")]
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
          <fieldset>
            <legend>
              <label id="list-name">
                List name:
                <input value={this.state.name} onChange={this.handleChangeName}>
                </input>
              </label>
            </legend>
            <div id="items-group">
              {items}
              <button id="add-item" type="button"
                      onClick={this.handleClick}>+</button>
              <button id="submit" type="submit">Save</button>
            </div>
          </fieldset>
        </form>
      </section>
    ) 
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const shoppingList = new ShoppingList(this.state.name,
                                          this.state.items);

    this.setState({
      name: "",
      items: [new ShoppingListItem("")]
    });

    LocalStorageManager.addShoppingList(shoppingList);
  }

  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleChangeItem = (event, id) => {
    const items = [...this.state.items];

    items.find(item => item.id === id).name = event.target.value;

    this.setState({items: items});
  }

  handleClick = (event) => {
    event.preventDefault();

    const items = [...this.state.items, new ShoppingListItem("")];

    this.setState({items: items});
  }

  handleRemoveClick = (event, id) => {
    event.preventDefault();

    const items = this.state.items.filter(item => item.id !== id);

    this.setState({items: items});
  }
}

export default AddShoppingLists;
