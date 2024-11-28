export class CreateBlogPostInputDto {
  title: string;
  content: string;
  authorId: string;

  constructor(title: string, content: string, authorId: string) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}
