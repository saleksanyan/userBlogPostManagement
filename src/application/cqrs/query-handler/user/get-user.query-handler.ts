import { UserModel } from '../../../../domain/models/user.model';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { GetUserQuery } from '../../query/user/get-user.query';

export class GetUserHandler {
  constructor(private userRepository: IUserRepository) {}

  async handle(query: GetUserQuery): Promise<UserModel[]> {
    return this.userRepository.getAll();
  }
}
