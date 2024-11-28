'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.InMemoryBlogPostRepository = void 0;
const blog_post_not_found_exception_1 = require('../../application/exceptions/blog-post-not-found.exception');
const invalid_post_exception_1 = require('../../application/exceptions/invalid-post.exception');
const blog_post_mapper_1 = require('../mappers/blog-post/blog-post.mapper');
class InMemoryBlogPostRepository {
  constructor() {
    this.posts = [];
  }
  create(post) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!post.isValid()) {
        throw new invalid_post_exception_1.InvalidPostException(
          `Post has invalid title or content`,
        );
      }
      const mappedPost =
        blog_post_mapper_1.BlogPostMapper.mapModelToEntity(post);
      this.posts.push(mappedPost);
      return post;
    });
  }
  update(post) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!post.isValid()) {
        throw new invalid_post_exception_1.InvalidPostException(
          `Post has invalid title or content`,
        );
      }
      const index = this.posts.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        this.posts[index] =
          blog_post_mapper_1.BlogPostMapper.mapModelToEntity(post);
      }
      return post;
    });
  }
  delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
  getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const post = this.posts.find((post) => post.id === id) || null;
      if (!post) {
        throw new blog_post_not_found_exception_1.BlogPostNotFoundException(
          `Blog post with ID ${id} not found`,
        );
      }
      return blog_post_mapper_1.BlogPostMapper.mapEntityToModel(post);
    });
  }
  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      const mappedPosts = this.posts.map((post) =>
        blog_post_mapper_1.BlogPostMapper.mapEntityToModel(post),
      );
      return mappedPosts;
    });
  }
}
exports.InMemoryBlogPostRepository = InMemoryBlogPostRepository;
