import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CaptchaController } from './captcha/captcha.controller';
import { RedisService } from './config/redis.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      logger: 'advanced-console',
      maxQueryExecutionTime: 600000,
      entityPrefix: '', //- 给此数据库连接上的所有表（或集合）加的前缀。
      synchronize: false, // 指示是否在每次应用程序启动时自动创建数据库架构。 请注意此选项，不要在生产环境中使用它，否则将丢失所有生产数据。但是此选项在调试和开发期间非常有用
    }),
    UserModule,
  ],
  controllers: [CaptchaController],
  providers: [RedisService],
})
export class AppModule {}
