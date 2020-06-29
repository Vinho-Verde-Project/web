export default class Product {
  constructor(id, title, category, type = "RAW", attributes = []) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.attributes = attributes;
    this.type = type;
  }
}
