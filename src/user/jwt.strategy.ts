/*
 *当前日期：星期六
 *文件路径：src/user/jwt.strategy.ts
 *IDE 名称：WebStorm
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // 创建这个接口来定义载荷结构

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'nestJWT', // 确保与 JwtModule 中的密钥一致
    });
  }

  async validate(payload: JwtPayload) {
    // 可以在这里添加用户验证逻辑，返回用户信息
    return { username: payload.username, id: payload.id, role: payload.role };
  }
}
