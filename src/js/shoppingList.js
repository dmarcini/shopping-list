import LocalStorageManager from "./localStorageManager";

class ShoppingListModel {
  constructor(title, items = []) {
    this.id = LocalStorageManager.getIDCounter();
    this.title = title;
    this.items = items;
  }

  addItem(item) {
    this.items.push(item);;
  }
}

class ShoppingListItemModel {
  constructor(name) {
    this.id = Counter.getAndIncrement();
    this.name = name;
  }
}

class Counter {
  static #count = 0;

  static getAndIncrement() {
    return this.#count++;
  }
}

export { ShoppingListModel, ShoppingListItemModel };
