import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserCommand } from '../../application/cqrs/commands/user/create-user.command';
import { UpdateUserCommand } from '../../application/cqrs/commands/user/update-user.command';
import { GetUserByIdQuery } from '../../application/cqrs/query/user/get-user-by-id.query';
import { GetUserQuery } from '../../application/cqrs/query/user/get-user.query';
import { UserOutputDTO } from '../../domain/dtos/output/output-user.dto';
import { CreateUserHandler } from '../../application/cqrs/command-handlers/user/create-blog-post.command-handler';
import { UpdateUserHandler } from '../../application/cqrs/command-handlers/user/update-blog-post.command-handler';
import { GetUserByIdHandler } from '../../application/cqrs/query-handler/user/get-user-by-id.query-handler';
import { GetUserHandler } from '../../application/cqrs/query-handler/user/get-user.query-handler';
import { InMemoryUserRepository } from '../../infastructure/repository-handlers/user-in-memory.repository-handler';

export class UserController {
  private createUserHandler: CreateUserHandler;
  private updateUserHandler: UpdateUserHandler;
  private getUserHandler: GetUserHandler;
  private getUserByIdHandler: GetUserByIdHandler;

  constructor(userRepository: InMemoryUserRepository) {
    this.createUserHandler = new CreateUserHandler(userRepository);
    this.updateUserHandler = new UpdateUserHandler(userRepository);
    this.getUserHandler = new GetUserHandler(userRepository);
    this.getUserByIdHandler = new GetUserByIdHandler(userRepository);
  }

  public async handleRequest(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = req.url ?? '';
      const method = req.method ?? 'GET';

      if (url.startsWith('/users') && method === 'GET') {
        if (url === '/users') {
          const query = new GetUserQuery();
          const users = await this.getUserHandler.handle(query);
          const resultedUsers = users.map(
            (user) => new UserOutputDTO(user.id, user.username),
          );

          this.sendResponse(res, 200, resultedUsers);
        } else {
          const id = url.split('/users/')[1];
          const query = new GetUserByIdQuery(id);
          const user = await this.getUserByIdHandler.handle(query);

          const fetchedUser = new UserOutputDTO(user.id, user.username);

          this.sendResponse(res, 200, fetchedUser);
        }
      } else if (url === '/users' && method === 'POST') {
        const body = await this.parseRequestBody(req);
        const command = new CreateUserCommand(body);
        const user = await this.createUserHandler.handle(command);
        const createdUser = new UserOutputDTO(user.id, user.username);

        this.sendResponse(res, 201, createdUser);
      } else if (url.startsWith('/users/') && method === 'PUT') {
        const id = url.split('/users/')[1];
        const body = await this.parseRequestBody(req);
        const command = new UpdateUserCommand({ id, ...body });
        const user = await this.updateUserHandler.handle(command);
        const updatedUser = new UserOutputDTO(user.id, user.username);

        this.sendResponse(res, 200, updatedUser);
      } else {
        this.sendResponse(res, 404, { message: 'User route not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      this.sendResponse(res, 500, {
        message: 'Internal Server Error',
        error: error,
      });
    }
  }

  private sendResponse(
    res: ServerResponse,
    statusCode: number,
    data: any = null,
  ) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end();
    }
  }

  private parseRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', () => resolve(JSON.parse(body)));
      req.on('error', (err) => reject(err));
    });
  }
}
