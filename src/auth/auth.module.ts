import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[UserModule,SharedModule]
})
export class AuthModule {}
