import React from "react";

import LocalStorageManager from "../../../../js/localStorageManager";

import "./ShowList.css";

class ShowList  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTitleEditable: false,
      title: this.props.list.title
    }
  }

  render() {
    const listType = this.props.listType;
  
    const shouldShowEditListTitleButton = (listType === "removed") ? false
                                                                   : true;
    const thrashIconClass = (listType === "removed") ? "fas fa-trash-restore" :
                                                       "fa fa-trash";

    return (
      <div
          key={this.props.list.id}
          className="list"
          onClick={this.props.onClickShowList}
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
          <span className="list-length">
            0 / {this.props.list.items.length}
          </span>
          <button 
            className="list-remove"
            onClick={(event) => (
              this.props.onClickRemoveList(event, this.props.list.id)
            )}
          >
            <span className={thrashIconClass}></span>
          </button>
           <div className="line"></div>
        </div>
    );
  }
 
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
}

export default ShowList;
