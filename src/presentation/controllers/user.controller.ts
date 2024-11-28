import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../../application/services/user/user.service';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async handleRequest(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = req.url ?? '';
      const method = req.method ?? 'GET';

      if (url.startsWith('/users') && method === 'GET') {
        if (url === '/users') {
          const users = await this.userService.getUser();
          this.sendResponse(res, 200, users);
        } else {
          const id = url.split('/users/')[1];
          const user = await this.userService.getUserById(id);
          this.sendResponse(res, 200, user);
        }
      } else if (url === '/users' && method === 'POST') {
        const body = await this.parseRequestBody(req);
        const createdUser = await this.userService.createUser(body);
        this.sendResponse(res, 201, createdUser);
      } else if (url.startsWith('/users/') && method === 'PUT') {
        const id = url.split('/users/')[1];
        const body = await this.parseRequestBody(req);
        const updatedUser = await this.userService.updateUser({ id, ...body });
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
