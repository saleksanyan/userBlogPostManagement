import { IncomingMessage, ServerResponse } from 'http';
import { CreateBlogPostHandler } from '../../application/cqrs/command-handlers/blog-post/create-blog-post.command-handler';
import { DeleteBlogPostHandler } from '../../application/cqrs/command-handlers/blog-post/delete-blog-post.command-handler';
import { UpdateBlogPostHandler } from '../../application/cqrs/command-handlers/blog-post/update-blog-post.command-handler';
import { CreateBlogPostCommand } from '../../application/cqrs/commands/blog-post/create-blog-post.command';
import { GetBlogPostByIdHandler } from '../../application/cqrs/query-handler/blog-post/get-blog-post-by-id.query-handler';
import { GetBlogPostsHandler } from '../../application/cqrs/query-handler/blog-post/get-blog-post.query-handler';
import { BlogPostOutputDTO } from '../../domain/dtos/output/output-blog-post.dto';
import { IBlogPostRepository } from '../../domain/repositories/blog-post.repository';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UpdateBlogPostCommand } from '../../application/cqrs/commands/blog-post/update-blog-post.command';
import { DeleteBlogPostCommand } from '../../application/cqrs/commands/blog-post/delete-blog-post.command';
import { GetBlogPostsQuery } from '../../application/cqrs/query/blog-post/get-blog-post.query';
import { GetBlogPostByIdQuery } from '../../application/cqrs/query/blog-post/get-blog-post-by-id.query';

export class BlogPostController {
  private createPostHandler: CreateBlogPostHandler;
  private updatePostHandler: UpdateBlogPostHandler;
  private deletePostHandler: DeleteBlogPostHandler;
  private getPostsHandler: GetBlogPostsHandler;
  private getPostByIdHandler: GetBlogPostByIdHandler;

  constructor(
    postRepository: IBlogPostRepository,
    userRepository: IUserRepository,
  ) {
    this.createPostHandler = new CreateBlogPostHandler(
      postRepository,
      userRepository,
    );
    this.updatePostHandler = new UpdateBlogPostHandler(postRepository);
    this.deletePostHandler = new DeleteBlogPostHandler(postRepository);
    this.getPostsHandler = new GetBlogPostsHandler(postRepository);
    this.getPostByIdHandler = new GetBlogPostByIdHandler(postRepository);
  }

  public async handleRequest(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = req.url ?? '';
      const method = req.method ?? 'GET';

      if (url.startsWith('/posts') && method === 'GET') {
        if (url === '/posts') {
          const query = new GetBlogPostsQuery();
          const posts = await this.getPostsHandler.handle(query);
          const resultedPosts = posts.map(
            (post) =>
              new BlogPostOutputDTO(
                post.id,
                post.title,
                post.content,
                post.author.username,
              ),
          );

          this.sendResponse(res, 200, resultedPosts);
        } else {
          const id = url.split('/posts/')[1];
          const query = new GetBlogPostByIdQuery(id);
          const post = await this.getPostByIdHandler.handle(query);
          const resultedPost = new BlogPostOutputDTO(
            post.id,
            post.title,
            post.content,
            post.author.username,
          );

          this.sendResponse(res, 200, resultedPost);
        }
      } else if (url === '/posts' && method === 'POST') {
        const body = await this.parseRequestBody(req);
        const command = new CreateBlogPostCommand(body);
        const post = await this.createPostHandler.handle(command);
        const createdPost = new BlogPostOutputDTO(
          post.id,
          post.title,
          post.content,
          post.author.username,
        );

        this.sendResponse(res, 201, createdPost);
      } else if (url.startsWith('/posts/') && method === 'PUT') {
        const id = url.split('/posts/')[1];
        const body = await this.parseRequestBody(req);
        const command = new UpdateBlogPostCommand({
          id,
          ...body,
        });
        const post = await this.updatePostHandler.handle(command);

        const updatedPost = new BlogPostOutputDTO(
          post.id,
          post.title,
          post.content,
          post.author.username,
        );

        this.sendResponse(res, 200, updatedPost);
      } else if (url.startsWith('/posts/') && method === 'DELETE') {
        const id = url.split('/posts/')[1];
        const command = new DeleteBlogPostCommand(id);
        await this.deletePostHandler.handle(command);

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
