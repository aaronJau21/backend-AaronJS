import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/shared/hash/hash.service';
import { JsonWebTokenService } from 'src/shared/json-web-token/json-web-token.service';
import { Role } from 'src/role/entities/role.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jsonWebTokenService: JsonWebTokenService,
  ) {}

  async loginUSer(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    const role = await this.roleService.findOne(user?.role);

    if(!role){
      throw new NotFoundException('Rol no encontrado');
    }

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
      role: {
        name: role.name,
        permissions: role.permissions,
      },
    });

    return { user, token };
  }
}
