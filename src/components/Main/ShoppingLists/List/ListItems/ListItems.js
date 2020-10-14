import  React from "react";

import ListItem from "./ListItem/ListItem";

import LocalStorageManager from "../../../../../js/localStorageManager";
import { ShoppingListItemModel } from "../../../../../js/shoppingList";

import "./ListItems.css";

class ListItems extends React.Component {
  constructor(props) {
    super(props);

    const items = LocalStorageManager.getItems("actual", this.props.list.id);

    const lastItem = items[items.length - 1];
    const lastItemID = lastItem === undefined ? 0 : lastItem.id;

    this.state = {
      idItemCounter: lastItemID + 1,
      items: [...items]
    }
  }

  renderListItem({id, name}) {
    return (
      <ListItem
        idList={this.props.list.id}
        id={id}
        key={id}
        value={name}
        onChange={this.handleChangeItem}
        onBlur={this.handleBlurUpdateItem}
        onClick={this.handleClickRemoveItem}
        switchItemChange={this.props.switchItemChange}
      />
    );
  }

  render() {
    return (
      <div class="items">
        {this.state.items.map((item) => this.renderListItem(item))}
        <button
          id="add-item"
          type="button"
          onClick={this.handleClickAddItem}
        >
          <span className="fas fa-plus"></span>
        </button>
      </div>
    ) 
  }

  handleChangeItem = (event, id) => {
    const items = LocalStorageManager.getItems("actual", this.props.list.id);

    items.find(item => item.id === id).name = event.target.value;

    this.setState({items: items});
  }

  handleClickAddItem = (event) => {
    event.preventDefault();

    const items = [...LocalStorageManager.getItems("actual",
                                                   this.props.list.id),
                   new ShoppingListItemModel(this.state.idItemCounter, "")];

    this.setState((state) => ({
      idItemCounter: state.idItemCounter + 1,
      items: items
    }));

    LocalStorageManager.updateItems(this.props.list.id, items);

    this.props.switchItemChange();
  }

  handleBlurUpdateItem = () => {
    LocalStorageManager.updateItems(this.props.list.id, this.state.items);

    this.props.switchItemChange();
  }

  handleClickRemoveItem = (event, id) => {
    event.preventDefault();

    const items = this.state.items.filter(item => item.id !== id);

    this.setState({items: items});

    LocalStorageManager.updateItems(this.props.list.id, items);

    this.props.switchItemChange();
  }
}

export default ListItems;
