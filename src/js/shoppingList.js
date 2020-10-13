import LocalStorageManager from "./localStorageManager";

class ShoppingListModel {
  constructor(title, items = []) {
    this.id = LocalStorageManager.getIDCounter();
    this.title = title;
    this.items = items;
    this.expirationDate = null;
  }
}

class ShoppingListItemModel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isChecked = false;
  }
}

export { ShoppingListModel, ShoppingListItemModel };
