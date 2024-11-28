import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { DeleteBlogPostCommand } from '../../commands/blog-post/delete-blog-post.command';

export class DeleteBlogPostHandler {
  constructor(private postRepository: IBlogPostRepository) {}

  async handle(command: DeleteBlogPostCommand): Promise<void> {
    await this.postRepository.delete(command.id);
  }
}
