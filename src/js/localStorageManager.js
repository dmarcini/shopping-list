class LocalStorageManager {
  constructor() {
    this.idCounter = 0;
    this.shoppingLists = [];
    this.removedShoppingLists = [];
  }

  static addShoppingList(shoppingList) {
    const localStorageManager = this.getInstance();

    let shoppingLists;

    if (localStorageManager.shoppingLists.length !== 0) {
      shoppingLists = [...localStorageManager.shoppingLists, shoppingList];
    } else {
      shoppingLists = [shoppingList];
    }
    
    localStorageManager.shoppingLists = shoppingLists
    localStorageManager.idCounter += 1;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager));
  }

  static updateShoppingList(shoppingList, id = null) {
    const idListToUpdate = (id === null) ? this.getLastShoppingList().id : id;
    const shoppingLists = this.getShoppingLists();

    shoppingLists[idListToUpdate] = shoppingList;

    localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists));
  }

  static removeShoppingList(id) {
    const localStorageManager = this.getInstance();

    const shoppingLists = [...localStorageManager.shoppingLists];
    const removedShopingLists = [...localStorageManager.removedShoppingLists];

    const index = shoppingLists.findIndex(shoppingList => {
      return shoppingList.id === id;
    });

    if (index === undefined) {
      return;
    }

    removedShopingLists.push(shoppingLists[index]);
    shoppingLists.splice(index, 1);

    localStorageManager.removeShoppingList = removedShopingLists;
    localStorageManager.shoppingLists = shoppingLists;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager));
  }

  static getLastShoppingList() {
    const listsNumber = this.getShoppingLists().length();

    return this.getShoppingLists()[listsNumber - 1];
  }

  static getShoppingLists() {
    const localStorageManager = this.getInstance();
    const shoppingLists = localStorageManager.shoppingLists;

    return shoppingLists;
  }

  static getDeletedShoppingLists() {
    const localStorageManager = this.getInstance();
    const deletedShoppingLists = localStorageManager.deletedShoppingLists;

    return deletedShoppingLists;
  }

  static getIDCounter() {
    return JSON.parse(localStorage.getItem("shoppingLists")).idCounter;
  }

  static getInstance() {
    return JSON.parse(localStorage.getItem("shoppingLists"));
  }
}

export default LocalStorageManager;
