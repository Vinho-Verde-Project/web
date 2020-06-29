export class Post {
  constructor(id, type, title, subheader, status, content, createdAt) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.subheader = subheader;
    this.status = status;
    this.content = content;
    this.createdAt = createdAt;
  }
}
