import React from "react";

import ListItems from "./ListItems/ListItems";

import LocalStorageManager from "../../../../js/localStorageManager";

import "./List.css";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderListItems: false,
      isTitleEditable: false,
      title: this.props.list.title,
      itemChangeSwitch: false
    }
  }

  render() {
    const listType = this.props.listType;
  
    const shouldShowEditListTitleButton = 
      (listType === "removed") ? false : true;
    const thrashIconClass = 
      (listType === "removed") ? "fas fa-trash-restore" : "fa fa-trash";

    const items = LocalStorageManager.getItems(listType, this.props.list.id);
    const itemsNumber = items.length;
    const checkedItemsNumber = items.filter(item => item.isChecked).length;

    const daysToExpiration =
      Math.floor((new Date(this.props.list.expirationDate) - new Date()) / 
                 (1000 * 3600 * 24));

    let listItems = 
      !this.state.shouldRenderListItems ? null : 
        (<ListItems
          list={this.props.list}
          switchItemChange={this.switchItemChange}
       />);
                                    
    return (
      <div
          key={this.props.list.id}
          className="list"
        >
          <div
            className="description"
            onClick={(listType === "actual") ? this.handleClickShowList : null}
          >
            <div className="list-title-container">
              <input
                className="list-title"
                placeholder={this.props.list.title}
                value={this.state.title}
                disabled={true}
                onChange={this.handleChange}
                onBlur={(event) => this.handleBlur(event)}
              />
              <button
                className="list-title-edit"
                title="Edit list title"
                onClick={(event) => this.handleClickEditTitle(event)}
                hidden={!shouldShowEditListTitleButton}
              >
                <span className="fas fa-edit"></span>
              </button>
            </div>
            <span className="list-days-to-expiration">
              {(listType === "removed") ? daysToExpiration + 
                                          ((daysToExpiration > 1) ? " days" 
                                                                  : " day") 
                                        : null}
            </span>
            <span className="list-length">
              {checkedItemsNumber} / {itemsNumber}
            </span>
            <button 
              className="list-remove"
              onClick={(event) => (
                this.props.onClickRemoveList(event, this.props.list.id)
              )}
            >
              <span className={thrashIconClass}></span>
            </button>
          </div>
          {listItems}
        </div>
    );
  }

  handleClickShowList = () => {
    this.setState((state) => ({
      shouldRenderListItems: !state.shouldRenderListItems,
    })  
  )}

  handleClickEditTitle = (event) => {
    event.stopPropagation();

    this.setState((state) => ({isTitleEditable: !state.isTitleEditable}));

    const disabled = event.currentTarget.parentElement.firstChild.disabled;

    event.currentTarget.parentElement.firstChild.disabled = !disabled;
    event.currentTarget.parentElement.firstChild.focus();
  }

  handleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleBlur = (event) => {
    this.setState((state) => ({isTitleEditable: !state.isTitleEditable}));

    event.currentTarget.parentElement.firstChild.disabled =
     !event.currentTarget.parentElement.firstChild.disabled;

    const list = LocalStorageManager.getShoppingList(this.props.list.id);

    list.title = this.state.title;

    LocalStorageManager.updateShoppingList(this.props.list.id, list);
  }

  switchItemChange = () => {
    this.setState((state) => ({
      itemChangeSwitch: !state.itemChangeSwitch
    }));
  }
}

export default List;
