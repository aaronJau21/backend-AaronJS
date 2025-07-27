import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const {
          user: {
            fullName,
            email,
            role: { name },
          },
          token,
        } = data;
        return {
          user: {
            fullName,
            email,
            role: { name },
          },
          token,
        };
      }),
    );
  }
}
