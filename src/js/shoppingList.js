import LocalStorageManager from "./localStorageManager";

class ShoppingListModel {
  constructor(title, items = []) {
    this.id = LocalStorageManager.getIDCounter();
    this.title = title;
    this.items = items;
  }
}

class ShoppingListItemModel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export { ShoppingListModel, ShoppingListItemModel };
