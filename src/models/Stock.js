export default class Stock {
    constructor(id, title, type, quantity, unity, warehouse, entryDate, employee) {
      this.id = id;
      this.title = title;
      this.type = type;
      this.quantity = quantity;
      this.unity = unity;
      this.warehouse = warehouse;
      this.entryDate = entryDate;
      this.employee = employee;
    }
  }