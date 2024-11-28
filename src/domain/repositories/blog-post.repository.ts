import { BlogPostModel } from '../models/blog-post.model';

export interface IBlogPostRepository {
  create(post: BlogPostModel): Promise<BlogPostModel>;
  update(post: BlogPostModel): Promise<BlogPostModel>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<BlogPostModel>;
  getAll(): Promise<BlogPostModel[]>;
}
