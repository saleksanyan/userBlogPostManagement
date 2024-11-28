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
exports.BlogPostService = void 0;
const output_blog_post_dto_1 = require('../../../domain/dtos/output/output-blog-post.dto');
const create_blog_post_command_handler_1 = require('../../cqrs/command-handlers/blog-post/create-blog-post.command-handler');
const delete_blog_post_command_handler_1 = require('../../cqrs/command-handlers/blog-post/delete-blog-post.command-handler');
const update_blog_post_command_handler_1 = require('../../cqrs/command-handlers/blog-post/update-blog-post.command-handler');
const create_blog_post_command_1 = require('../../cqrs/commands/blog-post/create-blog-post.command');
const delete_blog_post_command_1 = require('../../cqrs/commands/blog-post/delete-blog-post.command');
const update_blog_post_command_1 = require('../../cqrs/commands/blog-post/update-blog-post.command');
const get_blog_post_by_id_query_handler_1 = require('../../cqrs/query-handler/blog-post/get-blog-post-by-id.query-handler');
const get_blog_post_query_handler_1 = require('../../cqrs/query-handler/blog-post/get-blog-post.query-handler');
const get_blog_post_by_id_query_1 = require('../../cqrs/query/blog-post/get-blog-post-by-id.query');
const get_blog_post_query_1 = require('../../cqrs/query/blog-post/get-blog-post.query');
class BlogPostService {
  constructor(postRepository, userRepository) {
    this.createPostHandler =
      new create_blog_post_command_handler_1.CreateBlogPostHandler(
        postRepository,
        userRepository,
      );
    this.updatePostHandler =
      new update_blog_post_command_handler_1.UpdateBlogPostHandler(
        postRepository,
      );
    this.deletePostHandler =
      new delete_blog_post_command_handler_1.DeleteBlogPostHandler(
        postRepository,
      );
    this.getPostsHandler =
      new get_blog_post_query_handler_1.GetBlogPostsHandler(postRepository);
    this.getPostByIdHandler =
      new get_blog_post_by_id_query_handler_1.GetBlogPostByIdHandler(
        postRepository,
      );
  }
  createPost(createBlogPostInputDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const command = new create_blog_post_command_1.CreateBlogPostCommand(
        createBlogPostInputDto,
      );
      const post = yield this.createPostHandler.handle(command);
      return new output_blog_post_dto_1.BlogPostOutputDTO(
        post.id,
        post.title,
        post.content,
        post.author.username,
      );
    });
  }
  updatePost(updateBlogPostInputDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const command = new update_blog_post_command_1.UpdateBlogPostCommand(
        updateBlogPostInputDto,
      );
      const updatedPost = yield this.updatePostHandler.handle(command);
      return new output_blog_post_dto_1.BlogPostOutputDTO(
        updatedPost.id,
        updatedPost.title,
        updatedPost.content,
        updatedPost.author.username,
      );
    });
  }
  deletePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const command = new delete_blog_post_command_1.DeleteBlogPostCommand(id);
      yield this.deletePostHandler.handle(command);
    });
  }
  getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
      const query = new get_blog_post_query_1.GetBlogPostsQuery();
      const posts = yield this.getPostsHandler.handle(query);
      const resultedPosts = posts.map(
        (post) =>
          new output_blog_post_dto_1.BlogPostOutputDTO(
            post.id,
            post.title,
            post.content,
            post.author.username,
          ),
      );
      return resultedPosts;
    });
  }
  getPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const query = new get_blog_post_by_id_query_1.GetBlogPostByIdQuery(id);
      const post = yield this.getPostByIdHandler.handle(query);
      return new output_blog_post_dto_1.BlogPostOutputDTO(
        post.id,
        post.title,
        post.content,
        post.author.username,
      );
    });
  }
}
exports.BlogPostService = BlogPostService;
