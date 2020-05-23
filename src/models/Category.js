export default class Category {
  constructor(id, title, type, description = "", attributes = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.attributes = attributes;
  }
}
