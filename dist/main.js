'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const http_1 = __importDefault(require('http'));
const blog_post_service_1 = require('./application/services/blog-post/blog-post.service');
const user_service_1 = require('./application/services/user/user.service');
const blog_post_in_memory_repository_handler_1 = require('./infastructure/repository-handlers/blog-post-in-memory.repository-handler');
const user_in_memory_repository_handler_1 = require('./infastructure/repository-handlers/user-in-memory.repository-handler');
const blog_post_controller_1 = require('./presentation/controllers/blog-post.controller');
const user_controller_1 = require('./presentation/controllers/user.controller');
// Utility to normalize URLs
const normalizeUrl = (url) =>
  url === null || url === void 0
    ? void 0
    : url.split('?')[0].replace(/\/$/, '');
// Repositories
const blogPostRepository =
  new blog_post_in_memory_repository_handler_1.InMemoryBlogPostRepository();
const userRepository =
  new user_in_memory_repository_handler_1.InMemoryUserRepository();
// Services
const blogPostService = new blog_post_service_1.BlogPostService(
  blogPostRepository,
  userRepository,
);
const userService = new user_service_1.UserService(userRepository);
// Controllers
const blogPostController = new blog_post_controller_1.BlogPostController(
  blogPostService,
);
const userController = new user_controller_1.UserController(userService);
// Central Server
const server = http_1.default.createServer((req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  const normalizedUrl = normalizeUrl(req.url);
  if (normalizedUrl === '/posts') {
    blogPostController.handleRequest(req, res);
  } else if (normalizedUrl === '/users') {
    userController.handleRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});
// Start server
const PORT = 3004;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
