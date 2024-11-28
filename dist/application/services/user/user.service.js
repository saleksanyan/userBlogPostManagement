'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const create_blog_post_command_handler_1 = require('../../cqrs/command-handlers/user/create-blog-post.command-handler');
const update_blog_post_command_handler_1 = require('../../cqrs/command-handlers/user/update-blog-post.command-handler');
const create_user_command_1 = require('../../cqrs/commands/user/create-user.command');
const update_user_command_1 = require('../../cqrs/commands/user/update-user.command');
const get_user_by_id_query_handler_1 = require('../../cqrs/query-handler/user/get-user-by-id.query-handler');
const get_user_query_handler_1 = require('../../cqrs/query-handler/user/get-user.query-handler');
const get_user_query_1 = require('../../cqrs/query/user/get-user.query');
const get_user_by_id_query_1 = require('../../cqrs/query/user/get-user-by-id.query');
const output_user_dto_1 = require('../../../domain/dtos/output/output-user.dto');
class UserService {
  constructor(userRepository) {
    this.createUserHandler =
      new create_blog_post_command_handler_1.CreateUserHandler(userRepository);
    this.updateUserHandler =
      new update_blog_post_command_handler_1.UpdateUserHandler(userRepository);
    this.getUserHandler = new get_user_query_handler_1.GetUserHandler(
      userRepository,
    );
    this.getUserByIdHandler =
      new get_user_by_id_query_handler_1.GetUserByIdHandler(userRepository);
  }
  createUser(createUserInputDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const command = new create_user_command_1.CreateUserCommand(
        createUserInputDto,
      );
      const user = yield this.createUserHandler.handle(command);
      return new output_user_dto_1.UserOutputDTO(user.id, user.username);
    });
  }
  updateUser(updateUserInputDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const command = new update_user_command_1.UpdateUserCommand(
        updateUserInputDto,
      );
      const user = yield this.updateUserHandler.handle(command);
      return new output_user_dto_1.UserOutputDTO(user.id, user.username);
    });
  }
  getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const query = new get_user_by_id_query_1.GetUserByIdQuery(id);
      const user = yield this.getUserByIdHandler.handle(query);
      return new output_user_dto_1.UserOutputDTO(user.id, user.username);
    });
  }
  getUser() {
    return __awaiter(this, void 0, void 0, function* () {
      const query = new get_user_query_1.GetUserQuery();
      const users = yield this.getUserHandler.handle(query);
      const resultedUsers = users.map(
        (user) => new output_user_dto_1.UserOutputDTO(user.id, user.username),
      );
      return resultedUsers;
    });
  }
}
exports.UserService = UserService;
