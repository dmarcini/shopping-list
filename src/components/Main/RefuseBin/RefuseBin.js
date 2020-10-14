import React from "react";

import List from "../ShoppingLists/List/List";

import LocalStorageManager from "../../../js/localStorageManager";

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
      <main id="removed-lists">
        {removedLists.map(list => (
          <List
            key={list.id}
            list={list}
            listType="removed"
            onClickRemoveList={this.handleClickRemoveList}
          />
        ))}
      </main>
    );
  }

  handleClickRemoveList = (event, id) => {
    LocalStorageManager.restoreRemovedShoppingList(id);

    this.setState((state) => ({state: !state.state}));
  }
}

export default RefuseBin;
