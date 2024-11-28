export class UpdateUserInputDto {
  password: string;
  userId: string;

  constructor(password: string, userId: string) {
    this.password = password;
    this.userId = userId;
  }
}
