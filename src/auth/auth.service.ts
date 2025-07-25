import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/shared/hash/hash.service';
import { JsonWebTokenService } from 'src/shared/json-web-token/json-web-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jsonWebTokenService: JsonWebTokenService,
  ) {}

  async loginUSer(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Credenciales Incorrectas');
    }

    const isPasswordValid = await this.hashService.verifyPassword(
      user.password,
      password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Credenciales Incorrectas');
    }

    const token = await this.jsonWebTokenService.createJwtUser({
      username: user.fullName,
      id: user.id,
      email: user.email,
    });

    return { user, token };
  }
}
