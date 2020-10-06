class ShoppingListModel {
  constructor(title, items = []) {
    const localStorageManager =
      JSON.parse(localStorage.getItem("shoppingLists"));

    this.id = parseInt(localStorageManager.id);
    this.title = title;
    this.items = items;

    localStorageManager.id = this.id + 1;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager));
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
