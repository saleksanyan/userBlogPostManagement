import { UserEntity } from '../../../domain/entities/user.entity';
import { UserModel } from '../../../domain/models/user.model';

export class UserMapper {
  static mapEntityToModel(entity: UserEntity): UserModel {
    return new UserModel(entity.id, entity.username, entity.password);
  }

  static mapModelToEntity(model: UserModel): UserEntity {
    return new UserEntity(model.id, model.username, model.password);
  }
}
