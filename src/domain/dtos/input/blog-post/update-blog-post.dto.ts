export class UpdateBlogPostInputDto {
  postId: string;
  content: string;
  authorId: string;

  constructor(postId: string, content: string, authorId: string) {
    this.postId = postId;
    this.content = content;
    this.authorId = authorId;
  }
}
