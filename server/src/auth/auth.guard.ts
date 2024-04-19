import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request, response } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
    //In this guard, we're using the Reflector to look for metadata attached to the route handlers or controllers
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    ////////// setting up when there is a public decoretor to allow access to the API

    //******************** */ remove this to make manual guard
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    ///////////
    if (isPublic) {
      // Allowing access
      return true;
    }
    //************** */
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.Access_secret,
      });
        // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch(error) {
      if (error.name === 'TokenExpiredError') {
        // Throw a custom UnauthorizedException with status 304
        throw new UnauthorizedException('Token expired', '301'); // Use 401 for Unauthorized
      } else {
        // For other errors, simply throw the UnauthorizedException as before
        throw new UnauthorizedException();
      }    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
