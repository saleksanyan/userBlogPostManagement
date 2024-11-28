export class UserModel {
  private _id: string;
  private _username: string;
  private _password: string;

  constructor(id: string, username: string, password: string) {
    this._id = id;
    this._username = username;
    this._password = password;
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  isValidUsername(): boolean {
    return this._username.length > 0 && this._username.length < 255;
  }

  isValidPassword(): boolean {
    return this._password.length > 0 && this._password.length < 255;
  }
}
