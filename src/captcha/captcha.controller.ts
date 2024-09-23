import { Controller, Get } from '@nestjs/common';
import { RedisService } from '../config/redis.service';
import * as svgCaptcha from 'svg-captcha';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly redisService: RedisService) {}

  @Get('/image')
  generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 10,
      color: true,
      background: '#fff',
      // charPreset: '1234567890',
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString(
        'base64',
      )}`,
      id: Date.now(),
    };
    const key = `captcha:${Date.now()}`;
    this.redisService.set(key, captcha.text, 300).then(() => {}); // 存储验证码文本，300秒后过期

    return result;
  }
}
