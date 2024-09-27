import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from '../config/redis.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'nestJWT', // 请替换为安全的密钥
      signOptions: { expiresIn: '1h' }, // 设置过期时间
    }),
  ],
  controllers: [UserController],
  providers: [UserService, RedisService],
})
export class UserModule {}
