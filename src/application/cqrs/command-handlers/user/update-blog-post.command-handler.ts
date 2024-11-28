import { UserModel } from '../../../../domain/models/user.model';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { UpdateUserCommand } from '../../commands/user/update-user.command';

export class UpdateUserHandler {
  constructor(private userRepository: IUserRepository) {}

  async handle(command: UpdateUserCommand): Promise<UserModel> {
    const user = await this.userRepository.getById(
      command.updateUserInputDto.userId,
    );
    user.password = command.updateUserInputDto.password;
    await this.userRepository.update(user);

    return user;
  }
}
