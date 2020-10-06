import * as React from "react";

import "./AddItem.css";

class AddItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }
  }

  render() {
    return (
      <div class="item">
        <input className="item-name" type="text"
               value={this.props.value}
               onChange={(event) => this.props.onChange(event, this.props.id)}
        />
        <input type="checkbox"></input>
        <button class="remove-item" type="button"
                onClick={(event) => this.props.onClick(event, this.props.id)}>
          <span class="fa fa-trash"></span>
        </button>
      </div>
    );
  }
}

export default AddItems;
