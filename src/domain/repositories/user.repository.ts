import { UserModel } from '../models/user.model';

export interface IUserRepository {
  create(post: UserModel): Promise<UserModel>;
  update(post: UserModel): Promise<UserModel>;
  getById(id: string): Promise<UserModel>;
  getAll(): Promise<UserModel[]>;
}
