import { BlogPostModel } from '../../../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { CreateBlogPostCommand } from '../../commands/blog-post/create-blog-post.command';

export class CreateBlogPostHandler {
  constructor(
    private blogPostRepository: IBlogPostRepository,
    private userRepository: IUserRepository,
  ) {}

  async handle(command: CreateBlogPostCommand): Promise<BlogPostModel> {
    const author = await this.userRepository.getById(
      command.createBlogPostInputDto.authorId,
    );

    const post = new BlogPostModel(
      (Math.random() * 1000).toString(),
      command.createBlogPostInputDto.title,
      command.createBlogPostInputDto.content,
      author,
    );
    await this.blogPostRepository.create(post);

    return post;
  }
}
