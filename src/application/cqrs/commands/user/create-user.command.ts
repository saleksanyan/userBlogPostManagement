import { CreateUserInputDto } from '../../../../domain/dtos/input/user/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly createUserInputDto: CreateUserInputDto) {}
}
