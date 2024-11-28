import { UpdateBlogPostInputDto } from '../../../../domain/dtos/input/blog-post/update-blog-post.dto';

export class UpdateBlogPostCommand {
  constructor(public readonly updateBlogPostInputDto: UpdateBlogPostInputDto) {}
}
