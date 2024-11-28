'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogPostNotFoundException = void 0;
class BlogPostNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'BlogPostNotFoundException';
  }
}
exports.BlogPostNotFoundException = BlogPostNotFoundException;
