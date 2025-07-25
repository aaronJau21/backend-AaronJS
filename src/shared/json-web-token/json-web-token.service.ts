import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createJwtUser(user: {
    username: string;
    id: string;
    email: string;
  }): Promise<string> {
    const payload = { username: user.username, id: user.id, email: user.email };

    return await this.jwtService.signAsync(payload);
  }
}
