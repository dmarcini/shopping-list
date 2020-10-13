class LocalStorageManager {
  constructor() {
    this.idCounter = 0;
    this.shoppingLists = [];
    this.removedShoppingLists = [];
  }

  static EXPIRATION_DAYS = 30;
    
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

  static updateItem(listID, itemID, item) {
    const localStorageManager = this.getInstance();
    const shoppingLists = localStorageManager.shoppingLists;
    const listIndex = shoppingLists.findIndex(shoppingList => {
        return shoppingList.id === listID;
    });
    const itemIndex = shoppingLists[listIndex].items.findIndex(item => {
      return item.id === itemID;
    })

    shoppingLists[listIndex].items[itemIndex] = item;

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
    return this.getShoppingLists().find(shoppingList => {
      return shoppingList.id === id
    });
  }

  static getShoppingLists() {
    return this.getInstance().shoppingLists.filter(shoppingList => {
        return shoppingList !== undefined && shoppingList !== null;
      });
  }

  static getRemovedShoppingList(id) {
    return this.getRemovedShoppingLists().find(shoppingList => {
      return shoppingList.id === id
    });
  }

  static getRemovedShoppingLists() {
    return this.getInstance().removedShoppingLists
                             .filter(removedShoppingList => {
      return removedShoppingList !== undefined && removedShoppingList !== null;
    });
  }

  static getItems(listType, id) {
    if (listType === "actual") {
      return this.getShoppingList(id).items;
    }

    return this.getRemovedShoppingList(id).items;
  }

  static getItem(listType, listID, itemID) {
    if (listType === "actual") {
      return this.getItems("actual", listID).find(item => item.id === itemID);
    }

    return this.getItems("removed", listID).find(item => item.id === itemID);
  }

  static removeListsWithExpirationDateExceeded() {
    const localStorageManager = this.getInstance();

    const filteredRemovedShoppingLists =
      localStorageManager.removedShoppingLists.filter(removedShoppingList => {
        return new Date(removedShoppingList.expirationDate) > new Date();
      })

    localStorageManager.removedShoppingLists = filteredRemovedShoppingLists;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager));
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

    if (to === "removedShoppingLists") {
      const date = new Date();

      date.setDate(date.getDate() + this.EXPIRATION_DAYS);

      fromInstance[index].expirationDate = date;
    } else {
      fromInstance[index].expirationDate = null;
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
