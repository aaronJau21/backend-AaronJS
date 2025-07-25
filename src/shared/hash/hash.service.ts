import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashService {
  hashPassword(password: string) {
    return argon.hash(password);
  }

  verifyPassword(hash: string, password: string) {
    return argon.verify(hash, password);
  }
}
