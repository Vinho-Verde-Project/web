export default class Product {
  constructor(
    id,
    title,
    category,
    quantity = 0,
    unity = "Un.",
    attributes = []
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.quantity = quantity;
    this.unity = unity;
    this.attributes = attributes;
  }
}
