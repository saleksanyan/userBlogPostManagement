import { UserModel } from '../../../../domain/models/user.model';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { CreateUserCommand } from '../../commands/user/create-user.command';

export class CreateUserHandler {
  constructor(private userRepository: IUserRepository) {}

  async handle(command: CreateUserCommand): Promise<UserModel> {
    const user = new UserModel(
      (Math.random() * 1000).toString(),
      command.createUserInputDto.username,
      command.createUserInputDto.password,
    );
    return await this.userRepository.create(user);
  }
}
