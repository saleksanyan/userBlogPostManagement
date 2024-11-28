import { InMemoryUserRepository } from '../../../infastructure/repository-handlers/user-in-memory.repository-handler';
import { CreateUserHandler } from '../../cqrs/command-handlers/user/create-blog-post.command-handler';
import { UpdateUserHandler } from '../../cqrs/command-handlers/user/update-blog-post.command-handler';
import { CreateUserCommand } from '../../cqrs/commands/user/create-user.command';
import { UpdateUserCommand } from '../../cqrs/commands/user/update-user.command';
import { GetUserByIdHandler } from '../../cqrs/query-handler/user/get-user-by-id.query-handler';
import { GetUserHandler } from '../../cqrs/query-handler/user/get-user.query-handler';
import { GetUserQuery } from '../../cqrs/query/user/get-user.query';
import { GetUserByIdQuery } from '../../cqrs/query/user/get-user-by-id.query';
import { UserOutputDTO } from '../../../domain/dtos/output/output-user.dto';
import { UpdateUserInputDto } from '../../../domain/dtos/input/user/update-user.dto';
import { CreateUserInputDto } from '../../../domain/dtos/input/user/create-user.dto';

export class UserService {
  private createUserHandler: CreateUserHandler;
  private updateUserHandler: UpdateUserHandler;
  private getUserHandler: GetUserHandler;
  private getUserByIdHandler: GetUserByIdHandler;

  constructor(userRepository: InMemoryUserRepository) {
    this.createUserHandler = new CreateUserHandler(userRepository);
    this.updateUserHandler = new UpdateUserHandler(userRepository);
    this.getUserHandler = new GetUserHandler(userRepository);
    this.getUserByIdHandler = new GetUserByIdHandler(userRepository);
  }

  async createUser(
    createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDTO> {
    const command = new CreateUserCommand(createUserInputDto);
    const user = await this.createUserHandler.handle(command);

    return new UserOutputDTO(user.id, user.username);
  }

  async updateUser(
    updateUserInputDto: UpdateUserInputDto,
  ): Promise<UserOutputDTO> {
    const command = new UpdateUserCommand(updateUserInputDto);
    const user = await this.updateUserHandler.handle(command);

    return new UserOutputDTO(user.id, user.username);
  }

  async getUserById(id: string): Promise<UserOutputDTO> {
    const query = new GetUserByIdQuery(id);
    const user = await this.getUserByIdHandler.handle(query);

    return new UserOutputDTO(user.id, user.username);
  }

  async getUser(): Promise<UserOutputDTO[]> {
    const query = new GetUserQuery();
    const users = await this.getUserHandler.handle(query);
    const resultedUsers = users.map(
      (user) => new UserOutputDTO(user.id, user.username),
    );

    return resultedUsers;
  }
}
