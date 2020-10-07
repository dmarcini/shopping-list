import * as React from "react";
import { Row } from "react-bootstrap";

import "./AddItem.css";

class AddItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      isChecked: false
    }
  }

  render() {
    const disabled = this.state.isChecked ? "disabled" : "";

    return (
      <Row className={"item " + disabled}>
        <input className="item-name" type="text"
               disabled={this.state.isChecked}
               value={this.props.value}
               onChange={(event) => this.props.onChange(event, this.props.id)}
        />
        <input type="checkbox" onClick={this.handleClick}/>
        <button class="remove-item" type="button"
                onClick={(event) => this.props.onClick(event, this.props.id)}>
          <span class="fa fa-trash"></span>
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

export default AddItems;
