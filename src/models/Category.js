export default class Category {
  constructor(id, title, description = "", attributes = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.attributes = attributes;
  }
}
