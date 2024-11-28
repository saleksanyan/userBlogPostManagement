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
exports.BlogPostController = void 0;
class BlogPostController {
  constructor(blogPostService) {
    this.blogPostService = blogPostService;
  }
  handleRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a, _b;
      try {
        const url = (_a = req.url) !== null && _a !== void 0 ? _a : '';
        const method = (_b = req.method) !== null && _b !== void 0 ? _b : 'GET';
        if (url.startsWith('/posts') && method === 'GET') {
          if (url === '/posts') {
            const posts = yield this.blogPostService.getPosts();
            this.sendResponse(res, 200, posts);
          } else {
            const id = url.split('/posts/')[1];
            const post = yield this.blogPostService.getPostById(id);
            this.sendResponse(res, 200, post);
          }
        } else if (url === '/posts' && method === 'POST') {
          const body = yield this.parseRequestBody(req);
          const createdPost = yield this.blogPostService.createPost(body);
          this.sendResponse(res, 201, createdPost);
        } else if (url.startsWith('/posts/') && method === 'PUT') {
          const id = url.split('/posts/')[1];
          const body = yield this.parseRequestBody(req);
          const updatedPost = yield this.blogPostService.updatePost(
            Object.assign({ id }, body),
          );
          this.sendResponse(res, 200, updatedPost);
        } else if (url.startsWith('/posts/') && method === 'DELETE') {
          const id = url.split('/posts/')[1];
          yield this.blogPostService.deletePost(id);
          this.sendResponse(res, 204);
        } else {
          this.sendResponse(res, 404, { message: 'Post route not found' });
        }
      } catch (error) {
        console.error('Error:', error);
        this.sendResponse(res, 500, {
          message: 'Internal Server Error',
          error: error,
        });
      }
    });
  }
  sendResponse(res, statusCode, data = null) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end();
    }
  }
  parseRequestBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', () => resolve(JSON.parse(body)));
      req.on('error', (err) => reject(err));
    });
  }
}
exports.BlogPostController = BlogPostController;
