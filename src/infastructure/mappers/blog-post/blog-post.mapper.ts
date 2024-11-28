import { BlogPostEntity } from '../../../domain/entities/blog-post.entity';
import { BlogPostModel } from '../../../domain/models/blog-post.model';
import { UserMapper } from '../user/user.mapper';

export class BlogPostMapper {
  static mapEntityToModel(entity: BlogPostEntity): BlogPostModel {
    return new BlogPostModel(
      entity.id,
      entity.title,
      entity.content,
      UserMapper.mapEntityToModel(entity.authorId),
    );
  }

  static mapModelToEntity(model: BlogPostModel): BlogPostEntity {
    return new BlogPostEntity(
      model.id,
      model.title,
      model.content,
      model.author,
    );
  }
}
