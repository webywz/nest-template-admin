import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('nest-template-admin')
    .setDescription('基于nest的后台管理系统模板')
    .setVersion('1.0')
    .addTag('nest')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);
  // 启用跨域
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动剔除 DTO 中未定义的属性
      forbidNonWhitelisted: true, // 如果有不允许的属性会抛出错误
      transform: true, // 自动转换请求对象为 DTO 类型
      disableErrorMessages: false, // 确保错误消息被启用
    }),
  );
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('server started');
});
