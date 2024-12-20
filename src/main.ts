import http from 'http';
import { InMemoryBlogPostRepository } from './infastructure/repository-handlers/blog-post-in-memory.repository-handler';
import { InMemoryUserRepository } from './infastructure/repository-handlers/user-in-memory.repository-handler';
import { BlogPostController } from './presentation/controllers/blog-post.controller';
import { UserController } from './presentation/controllers/user.controller';

// Utility to normalize URLs
const normalizeUrl = (url?: string) => url?.split('?')[0].replace(/\/$/, '');

// Repositories
const blogPostRepository = new InMemoryBlogPostRepository();
const userRepository = new InMemoryUserRepository();

// Controllers
const blogPostController = new BlogPostController(
  blogPostRepository,
  userRepository,
);
const userController = new UserController(userRepository);

// Central Server
const server = http.createServer((req, res) => {
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
