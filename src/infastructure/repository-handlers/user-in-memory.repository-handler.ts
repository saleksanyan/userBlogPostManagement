import { DuplicateValueException } from '../../application/exceptions/duplicate-value.exception';
import { UserNotFoundException } from '../../application/exceptions/user-not-found.exception';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user/user.mapper';

export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async create(user: UserModel): Promise<UserModel> {
    const duplicateUsername = this.users.some(
      (u) => u.username === user.username,
    );

    if (duplicateUsername) {
      throw new DuplicateValueException(`User with ${user.username}`);
    }

    const mappedUser = UserMapper.mapModelToEntity(user);

    this.users.push(mappedUser);

    return user;
  }

  async update(user: UserModel): Promise<UserModel> {
    const index = this.users.findIndex((p) => p.id === user.id);
    if (index !== -1) {
      this.users[index] = UserMapper.mapModelToEntity(user);
    }

    return user;
  }

  async getById(id: string): Promise<UserModel> {
    const user = this.users.find((user) => user.id === id) || null;
    if (!user) {
      throw new UserNotFoundException(`User with ID ${id} not found`);
    }

    const mappedUser = UserMapper.mapEntityToModel(user);

    return mappedUser;
  }

  async getAll(): Promise<UserModel[]> {
    const mappedUsers = this.users.map((user) =>
      UserMapper.mapEntityToModel(user),
    );

    return mappedUsers;
  }
}
