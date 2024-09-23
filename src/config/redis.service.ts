/*
 *当前日期：星期一
 *文件路径：src/config/redis.service.ts
 *IDE 名称：WebStorm
 */
import * as Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private client: Redis.Redis;

  constructor() {
    // 配置你的Redis连接
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
      password: 'root',
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, seconds: number): Promise<string> {
    return this.client.set(key, value, 'EX', seconds);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}