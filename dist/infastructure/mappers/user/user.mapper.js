'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require('../../../domain/entities/user.entity');
const user_model_1 = require('../../../domain/models/user.model');
class UserMapper {
  static mapEntityToModel(entity) {
    return new user_model_1.UserModel(
      entity.id,
      entity.username,
      entity.password,
    );
  }
  static mapModelToEntity(model) {
    return new user_entity_1.UserEntity(
      model.id,
      model.username,
      model.password,
    );
  }
}
exports.UserMapper = UserMapper;
