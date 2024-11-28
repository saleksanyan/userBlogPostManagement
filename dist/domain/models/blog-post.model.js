'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogPostModel = void 0;
class BlogPostModel {
  constructor(id, title, content, author) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._author = author;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get content() {
    return this._content;
  }
  get author() {
    return this._author;
  }
  set content(content) {
    this._content = content;
  }
  isValid() {
    return this._title.length > 0 && this._content.length > 0;
  }
}
exports.BlogPostModel = BlogPostModel;
