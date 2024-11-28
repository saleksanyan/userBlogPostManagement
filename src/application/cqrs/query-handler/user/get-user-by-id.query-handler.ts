import { UserModel } from '../../../../domain/models/user.model';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { GetUserByIdQuery } from '../../query/user/get-user-by-id.query';

export class GetUserByIdHandler {
  constructor(private userRepository: IUserRepository) {}

  async handle(query: GetUserByIdQuery): Promise<UserModel> {
    return this.userRepository.getById(query.id);
  }
}
