export default class Stock {
  constructor(
    id,
    product,
    warehouse,
    type,
    minQuantity = 0,
    quantity = 0,
    unity = "Un",
    entryDate,
    employee
  ) {
    this.id = id;
    this.product = product;
    this.type = type;
    this.warehouse = warehouse;
    this.minQuantity = minQuantity;
    this.quantity = quantity;
    this.unity = unity;
    this.entryDate = entryDate;
    this.employee = employee;
  }
}
