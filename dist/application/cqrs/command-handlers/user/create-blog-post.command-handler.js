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
exports.CreateUserHandler = void 0;
const user_model_1 = require('../../../../domain/models/user.model');
class CreateUserHandler {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  handle(command) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = new user_model_1.UserModel(
        (Math.random() * 1000).toString(),
        command.createUserInputDto.username,
        command.createUserInputDto.password,
      );
      return yield this.userRepository.create(user);
    });
  }
}
exports.CreateUserHandler = CreateUserHandler;
