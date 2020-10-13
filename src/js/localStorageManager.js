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

  static updateShoppingList(id, shoppingList) {
    if (id === undefined || id === null) {
      return;
    }

    const localStorageManager = this.getInstance();
    const shoppingLists = localStorageManager.shoppingLists;

    const indexListToUpdate = shoppingLists.findIndex(shoppingList => {
      return shoppingList.id === id
    });

    shoppingLists[indexListToUpdate] = shoppingList;

    localStorageManager.shoppingLists = shoppingLists;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager));
  }

  static updateItems(id, items) {
    const localStorageManager = this.getInstance();
    const shoppingLists = localStorageManager.shoppingLists;

    shoppingLists.find(shoppingList => shoppingList.id === id).items = items;

    localStorageManager.shoppingLists = shoppingLists;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager));
  }

  static removeShoppingList(id) {
    this.moveShoppingList(id, "shoppingLists", "removedShoppingLists");
  }

  static restoreRemovedShoppingList(id) {
    this.moveShoppingList(id, "removedShoppingLists", "shoppingLists");
  }

  static getShoppingList(id) {
    const localStorageManager = this.getInstance();
    const shoppingLists = localStorageManager.shoppingLists;

    return shoppingLists.find(shoppingList => shoppingList.id === id);
  }

  static getShoppingLists() {
    const localStorageManager = this.getInstance();
    const shoppingLists = 
      localStorageManager.shoppingLists.filter(shoppingList => {
        return shoppingList !== undefined && shoppingList !== null;
      });

    return shoppingLists;
  }

  static getRemovedShoppingLists() {
    const localStorageManager = this.getInstance();
    const removedShoppingLists = [...localStorageManager.removedShoppingLists];

    return removedShoppingLists;
  }

  static getIDCounter() {
    return JSON.parse(localStorage.getItem("shoppingLists")).idCounter;
  }

  static getInstance() {
    return JSON.parse(localStorage.getItem("shoppingLists"));
  }

  static moveShoppingList(id, from, to) {
    const localStorageManager = this.getInstance();

    const fromInstance = [...localStorageManager[from]];
    let toInstance = [...localStorageManager[to]];

    const index = fromInstance.findIndex(shoppingList => {
      return shoppingList.id === id;
    });

    if (index === undefined) {
      return;
    }

    if (toInstance === undefined) {
      toInstance = [];
    }

    toInstance.push(fromInstance[index]);
    fromInstance.splice(index, 1);

    localStorageManager[from] = fromInstance;;
    localStorageManager[to] = toInstance;

    toInstance.sort((shoppingList1, shoppingList2) => {
      return shoppingList1.id - shoppingList2.id
    });

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager)); 
  }
}

export default LocalStorageManager;
