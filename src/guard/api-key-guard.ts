import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp().getRequest();
    const key = ctx.headers["x-auth-key"];

    if (!key || key !== "valid") {
      throw new UnauthorizedException("user not authorized");
    }

    return true;
  }
}
