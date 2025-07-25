import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthInterceptor } from 'src/shared/interceptor/auth/auth.interceptor';

@UseInterceptors(AuthInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUSer(@Body() loginDto: LoginDto) {
    return this.authService.loginUSer(loginDto);
  }
}
