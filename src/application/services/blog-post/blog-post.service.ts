import { CreateBlogPostInputDto } from '../../../domain/dtos/input/blog-post/create-blog-post.dto';
import { UpdateBlogPostInputDto } from '../../../domain/dtos/input/blog-post/update-blog-post.dto';
import { BlogPostOutputDTO } from '../../../domain/dtos/output/output-blog-post.dto';
import { IBlogPostRepository } from '../../../domain/repositories/blog-post.repository';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { CreateBlogPostHandler } from '../../cqrs/command-handlers/blog-post/create-blog-post.command-handler';
import { DeleteBlogPostHandler } from '../../cqrs/command-handlers/blog-post/delete-blog-post.command-handler';
import { UpdateBlogPostHandler } from '../../cqrs/command-handlers/blog-post/update-blog-post.command-handler';
import { CreateBlogPostCommand } from '../../cqrs/commands/blog-post/create-blog-post.command';
import { DeleteBlogPostCommand } from '../../cqrs/commands/blog-post/delete-blog-post.command';
import { UpdateBlogPostCommand } from '../../cqrs/commands/blog-post/update-blog-post.command';
import { GetBlogPostByIdHandler } from '../../cqrs/query-handler/blog-post/get-blog-post-by-id.query-handler';
import { GetBlogPostsHandler } from '../../cqrs/query-handler/blog-post/get-blog-post.query-handler';
import { GetBlogPostByIdQuery } from '../../cqrs/query/blog-post/get-blog-post-by-id.query';
import { GetBlogPostsQuery } from '../../cqrs/query/blog-post/get-blog-post.query';

export class BlogPostService {
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

  async createPost(
    createBlogPostInputDto: CreateBlogPostInputDto,
  ): Promise<BlogPostOutputDTO> {
    const command = new CreateBlogPostCommand(createBlogPostInputDto);
    const post = await this.createPostHandler.handle(command);

    return new BlogPostOutputDTO(
      post.id,
      post.title,
      post.content,
      post.author.username,
    );
  }

  async updatePost(
    updateBlogPostInputDto: UpdateBlogPostInputDto,
  ): Promise<BlogPostOutputDTO> {
    const command = new UpdateBlogPostCommand(updateBlogPostInputDto);
    const updatedPost = await this.updatePostHandler.handle(command);

    return new BlogPostOutputDTO(
      updatedPost.id,
      updatedPost.title,
      updatedPost.content,
      updatedPost.author.username,
    );
  }

  async deletePost(id: string): Promise<void> {
    const command = new DeleteBlogPostCommand(id);
    await this.deletePostHandler.handle(command);
  }

  async getPosts(): Promise<BlogPostOutputDTO[]> {
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
    return resultedPosts;
  }

  async getPostById(id: string): Promise<BlogPostOutputDTO> {
    const query = new GetBlogPostByIdQuery(id);
    const post = await this.getPostByIdHandler.handle(query);

    return new BlogPostOutputDTO(
      post.id,
      post.title,
      post.content,
      post.author.username,
    );
  }
}
