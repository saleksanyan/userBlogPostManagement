import { IncomingMessage, ServerResponse } from 'http';
import { BlogPostService } from '../../application/services/blog-post/blog-post.service';

export class BlogPostController {
  private blogPostService: BlogPostService;

  constructor(blogPostService: BlogPostService) {
    this.blogPostService = blogPostService;
  }

  public async handleRequest(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = req.url ?? '';
      const method = req.method ?? 'GET';

      if (url.startsWith('/posts') && method === 'GET') {
        if (url === '/posts') {
          const posts = await this.blogPostService.getPosts();
          this.sendResponse(res, 200, posts);
        } else {
          const id = url.split('/posts/')[1];
          const post = await this.blogPostService.getPostById(id);
          this.sendResponse(res, 200, post);
        }
      } else if (url === '/posts' && method === 'POST') {
        const body = await this.parseRequestBody(req);
        const createdPost = await this.blogPostService.createPost(body);
        this.sendResponse(res, 201, createdPost);
      } else if (url.startsWith('/posts/') && method === 'PUT') {
        const id = url.split('/posts/')[1];
        const body = await this.parseRequestBody(req);
        const updatedPost = await this.blogPostService.updatePost({
          id,
          ...body,
        });
        this.sendResponse(res, 200, updatedPost);
      } else if (url.startsWith('/posts/') && method === 'DELETE') {
        const id = url.split('/posts/')[1];
        await this.blogPostService.deletePost(id);
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
  }

  private sendResponse(
    res: ServerResponse,
    statusCode: number,
    data: any = null,
  ) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end();
    }
  }

  private parseRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', () => resolve(JSON.parse(body)));
      req.on('error', (err) => reject(err));
    });
  }
}
