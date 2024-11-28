import { BlogPostNotFoundException } from '../../application/exceptions/blog-post-not-found.exception';
import { InvalidPostException } from '../../application/exceptions/invalid-post.exception';
import { BlogPostEntity } from '../../domain/entities/blog-post.entity';
import { BlogPostModel } from '../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../domain/repositories/blog-post.repository';
import { BlogPostMapper } from '../mappers/blog-post/blog-post.mapper';

export class InMemoryBlogPostRepository implements IBlogPostRepository {
  private posts: BlogPostEntity[] = [];

  async create(post: BlogPostModel): Promise<BlogPostModel> {
    if (!post.isValid()) {
      throw new InvalidPostException(`Post has invalid title or content`);
    }
    const mappedPost = BlogPostMapper.mapModelToEntity(post);
    this.posts.push(mappedPost);

    return post;
  }

  async update(post: BlogPostModel): Promise<BlogPostModel> {
    if (!post.isValid()) {
      throw new InvalidPostException(`Post has invalid title or content`);
    }

    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = BlogPostMapper.mapModelToEntity(post);
    }

    return post;
  }

  async delete(id: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  async getById(id: string): Promise<BlogPostModel> {
    const post = this.posts.find((post) => post.id === id) || null;
    if (!post) {
      throw new BlogPostNotFoundException(`Blog post with ID ${id} not found`);
    }

    return BlogPostMapper.mapEntityToModel(post);
  }

  async getAll(): Promise<BlogPostModel[]> {
    const mappedPosts = this.posts.map((post) =>
      BlogPostMapper.mapEntityToModel(post),
    );

    return mappedPosts;
  }
}
