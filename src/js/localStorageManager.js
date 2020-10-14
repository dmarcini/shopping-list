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
    const shoppingList = this.getShoppingList(id);
    const date = new Date();

    date.setDate(date.getDate() + this.EXPIRATION_DAYS);
    shoppingList.expirationDate = date;

    this.updateShoppingList(id, shoppingList);
    this.moveShoppingList(id, "shoppingLists", "removedShoppingLists");
  }

  static restoreRemovedShoppingList(id) {
    this.moveShoppingList(id, "removedShoppingLists", "shoppingLists");

    const shoppingList = this.getShoppingList(id);

    shoppingList.expirationDate = null;

    this.updateShoppingList(id, shoppingList);
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
    return listType === "actual" ? this.getShoppingList(id).items
                                 : this.getRemovedShoppingList(id).items;
  }

  static getItem(listType, listID, itemID) {
    return listType === "actual" ? this.getItems("actual", listID)
                                       .find(item => item.id === itemID)
                                 : this.getItems("removed", listID)
                                       .find(item => item.id === itemID);
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
    return this.getInstance().idCounter;
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

    if (toInstance === undefined) {
      toInstance = [];
    }

    toInstance.push(fromInstance[index]);
    fromInstance.splice(index, 1);

    toInstance.sort((sl1, sl2) => new Date(sl1.expirationDate).getTime() - 
                                  new Date(sl2.expirationDate).getTime());

    localStorageManager[from] = fromInstance;;
    localStorageManager[to] = toInstance;

    localStorage.setItem("shoppingLists", JSON.stringify(localStorageManager)); 
  }
}

export default LocalStorageManager;
