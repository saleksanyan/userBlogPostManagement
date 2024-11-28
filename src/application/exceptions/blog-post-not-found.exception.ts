export class BlogPostNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BlogPostNotFoundException';
  }
}
