import * as React from "react";
import { Row } from "react-bootstrap";

import "./ListItem.css";

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      isChecked: false
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
  }
}

export default ListItem;
