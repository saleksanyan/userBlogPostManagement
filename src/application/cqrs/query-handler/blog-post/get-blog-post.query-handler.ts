import { BlogPostModel } from '../../../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { GetBlogPostsQuery } from '../../query/blog-post/get-blog-post.query';

export class GetBlogPostsHandler {
  constructor(private postRepository: IBlogPostRepository) {}

  async handle(query: GetBlogPostsQuery): Promise<BlogPostModel[]> {
    return this.postRepository.getAll();
  }
}
