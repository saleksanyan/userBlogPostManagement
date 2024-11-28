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
exports.InMemoryUserRepository = void 0;
const duplicate_value_exception_1 = require('../../application/exceptions/duplicate-value.exception');
const user_not_found_exception_1 = require('../../application/exceptions/user-not-found.exception');
const user_mapper_1 = require('../mappers/user/user.mapper');
class InMemoryUserRepository {
  constructor() {
    this.users = [];
  }
  create(user) {
    return __awaiter(this, void 0, void 0, function* () {
      const duplicateUsername = this.users.some(
        (u) => u.username === user.username,
      );
      if (duplicateUsername) {
        throw new duplicate_value_exception_1.DuplicateValueException(
          `User with ${user.username}`,
        );
      }
      const mappedUser = user_mapper_1.UserMapper.mapModelToEntity(user);
      this.users.push(mappedUser);
      return user;
    });
  }
  update(user) {
    return __awaiter(this, void 0, void 0, function* () {
      const index = this.users.findIndex((p) => p.id === user.id);
      if (index !== -1) {
        this.users[index] = user_mapper_1.UserMapper.mapModelToEntity(user);
      }
      return user;
    });
  }
  getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = this.users.find((user) => user.id === id) || null;
      if (!user) {
        throw new user_not_found_exception_1.UserNotFoundException(
          `User with ID ${id} not found`,
        );
      }
      const mappedUser = user_mapper_1.UserMapper.mapEntityToModel(user);
      return mappedUser;
    });
  }
  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      const mappedUsers = this.users.map((user) =>
        user_mapper_1.UserMapper.mapEntityToModel(user),
      );
      return mappedUsers;
    });
  }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
