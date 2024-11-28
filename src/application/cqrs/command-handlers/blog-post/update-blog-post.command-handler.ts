import { BlogPostModel } from '../../../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { UpdateBlogPostCommand } from '../../commands/blog-post/update-blog-post.command';

export class UpdateBlogPostHandler {
  constructor(private postRepository: IBlogPostRepository) {}

  async handle(command: UpdateBlogPostCommand): Promise<BlogPostModel> {
    const post = await this.postRepository.getById(
      command.updateBlogPostInputDto.authorId,
    );
    if (post) {
      post.content = command.updateBlogPostInputDto.content;
      await this.postRepository.update(post);
    }

    return post;
  }
}
