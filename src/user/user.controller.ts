import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/create-user.dto';
import { RedisService } from '../config/redis.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() user: RegisterUserDto) {
    const key = `captcha:${user.captchaId}`;
    const captchaDate = await this.redisService.get(key);
    if (captchaDate && captchaDate === user.captcha) {
      return await this.userService.register(user);
    } else {
      throw new BadRequestException('验证码错误');
    }
  }
}
