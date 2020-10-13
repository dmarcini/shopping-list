import * as React from "react";

import List from "../ShoppingLists/List/List";

import LocalStorageManager from "../../../js/localStorageManager";

import "./RefuseBin.css";

class RefuseBin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: false
    }
  }

  render() {
    const removedLists = LocalStorageManager.getRemovedShoppingLists();

    return (
      <div id="removed-lists">
        {removedLists.map(list => (
          <List
            key={list.id}
            list={list}
            listType="removed"
            onClickRemoveList={this.handleClickRemoveList}
          />
        ))}
      </div>
    );
  }

  handleClickRemoveList = (event, id) => {
    LocalStorageManager.restoreRemovedShoppingList(id);

    this.setState((state) => ({state: !state.state}));
  }
}

export default RefuseBin;
