import React from "react";
import { Row } from "react-bootstrap";

import LocalStorageManager from "../../../../../../js/localStorageManager";

import "./ListItem.css";

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    const item = LocalStorageManager.getItem("actual", this.props.idList,
                                             this.props.id);

    this.state = {
      value: "",
      isChecked: item === undefined ? false : item.isChecked
    }
  }

  render() {
    const disabled = this.state.isChecked ? "disabled" : "";
    const hidden = this.state.isChecked ? "" : "hidden";

    return (
      <Row className={"item " + disabled}>
        <input
          className="item-name"
          type="text"
          disabled={this.state.isChecked}
          value={this.props.value}
          onChange={(event) => this.props.onChange(event, this.props.id)}
          onBlur={this.props.onBlur}
        />
        <label className="checkbox">
          <input
            type="checkbox"
            onClick={this.handleClick}
          />
          <span className="checkmark">
            <span className={"fas fa-check " + hidden}></span>
          </span>
        </label>
        <button
          className="remove-item"
          type="button"
          onClick={(event) => this.props.onClick(event, this.props.id)}
        >
          <span className="fa fa-trash"></span>
        </button>
      </Row>
    );
  }

  handleClick = () => {
    this.setState((state) => ({
      isChecked: !state.isChecked
    }));

    const item = LocalStorageManager.getItem("actual", this.props.idList,
                                             this.props.id);

    if (item === undefined) {
      return;
    }

    item.isChecked = !this.state.isChecked;

    LocalStorageManager.updateItem(this.props.idList, this.props.id, item);

    this.props.switchItemChange();
  }
}

export default ListItem;
