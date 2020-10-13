import * as React from "react";
import { Container } from "react-bootstrap";

import ListItem from "../ListItem/ListItem";

import LocalStorageManager from "../../../../js/localStorageManager";
import { ShoppingListItemModel } from "../../../../js/shoppingList";

import "./ShoppingList.css";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    const items = LocalStorageManager.getShoppingList(this.props.list.id)
                                     .items;

    const lastItem = items[items.length - 1];
    const lastItemID = lastItem === undefined ? 0 : lastItem.id;

    this.state = {
      idItemCounter: lastItemID + 1,
      items: [...items]
    }
  }

  renderListItem(id, value) {
    return (
      <ListItem
        id={id}
        key={id}
        value={value}
        onChange={this.handleChangeItem}
        onBlur={this.handleBlurUpdateItem}
        onClick={this.handleClickRemove}
      />
    );
  }

  render() {
    const items = this.state.items.map((item) => {
      return this.renderListItem(item.id, item.name);
    });

    return (
      <main>
        <h1 id="list-name">{this.props.list.title}</h1>
        <Container>
          {items}
          <button
            id="add-item"
            type="button"
            onClick={this.handleClickAddItem}
          >
            <span className="fas fa-plus"></span>
          </button>
        </Container>
      </main>
    ) 
  }

  handleChangeItem = (event, id) => {
    const items = [...this.state.items];

    items.find(item => item.id === id).name = event.target.value;

    this.setState({items: items});
  }

  handleClickAddItem = (event) => {
    event.preventDefault();

    const items = [...this.state.items,
                   new ShoppingListItemModel(this.state.idItemCounter, "")];

    this.setState((state) => ({
      idItemCounter: state.idItemCounter + 1,
      items: items
    }));
  }

  handleBlurUpdateItem = () => {
    LocalStorageManager.updateItems(this.props.list.id, this.state.items);
  }

  handleClickRemove = (event, id) => {
    event.preventDefault();

    const items = this.state.items.filter(item => item.id !== id);

    this.setState({items: items});

    LocalStorageManager.updateItems(this.props.list.id, items);
  }
}

export default ShoppingList;
