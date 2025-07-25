import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/shared/decoradores/permitions/permitions.decorator';

@Injectable()
export class PermitionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('🔐 Permisos requeridos:', requiredPermissions);
    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log('👤 Usuario:', user);
    console.log('📦 Permisos del usuario:', user?.permissions);

    const userPermissions = user?.permissions || [];

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    console.log('✅ ¿Tiene todos los permisos requeridos?:', hasPermission);

    if (!hasPermission) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    return true;
  }
}
