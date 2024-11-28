import { BlogPostModel } from '../../../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { GetBlogPostByIdQuery } from '../../query/blog-post/get-blog-post-by-id.query';

export class GetBlogPostByIdHandler {
  constructor(private postRepository: IBlogPostRepository) {}

  async handle(query: GetBlogPostByIdQuery): Promise<BlogPostModel> {
    return this.postRepository.getById(query.id);
  }
}
