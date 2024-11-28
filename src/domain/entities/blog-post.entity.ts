import { UserEntity } from './user.entity';

export class BlogPostEntity {
  public id: string;
  public title: string;
  public content: string;
  public authorId: UserEntity;

  constructor(
    id: string,
    title: string,
    content: string,
    authorId: UserEntity,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}
