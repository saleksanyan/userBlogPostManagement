'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundException';
  }
}
exports.UserNotFoundException = UserNotFoundException;
