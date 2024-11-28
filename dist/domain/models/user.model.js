'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserModel = void 0;
class UserModel {
  constructor(id, username, password) {
    this._id = id;
    this._username = username;
    this._password = password;
  }
  get id() {
    return this._id;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  set password(password) {
    this._password = password;
  }
  isValidUsername() {
    return this._username.length > 0 && this._username.length < 255;
  }
  isValidPassword() {
    return this._password.length > 0 && this._password.length < 255;
  }
}
exports.UserModel = UserModel;
