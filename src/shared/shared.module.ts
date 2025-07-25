import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { JsonWebTokenService } from './json-web-token/json-web-token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [HashService, JsonWebTokenService],
  exports: [HashService,JsonWebTokenService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SharedModule {}
