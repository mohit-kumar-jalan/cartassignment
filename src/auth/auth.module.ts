import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';
import { TokenEntity } from './token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';

@Module({
  imports: [JwtModule.register({
    secret: 'key',
    signOptions: { expiresIn: '180s' },
  }),TypeOrmModule.forFeature([UserEntity]),TypeOrmModule.forFeature([TokenEntity]),JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async () => ({
      secret: process.env.JWT_SECRET,
    }),
    inject: [ConfigService],
  })],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
