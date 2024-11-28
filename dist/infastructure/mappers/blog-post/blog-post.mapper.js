'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogPostMapper = void 0;
const blog_post_entity_1 = require('../../../domain/entities/blog-post.entity');
const blog_post_model_1 = require('../../../domain/models/blog-post.model');
const user_mapper_1 = require('../user/user.mapper');
class BlogPostMapper {
  static mapEntityToModel(entity) {
    return new blog_post_model_1.BlogPostModel(
      entity.id,
      entity.title,
      entity.content,
      user_mapper_1.UserMapper.mapEntityToModel(entity.authorId),
    );
  }
  static mapModelToEntity(model) {
    return new blog_post_entity_1.BlogPostEntity(
      model.id,
      model.title,
      model.content,
      model.author,
    );
  }
}
exports.BlogPostMapper = BlogPostMapper;
