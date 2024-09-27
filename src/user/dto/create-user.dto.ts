import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {}
export class RegisterUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ name: 'username', description: '用户名称' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, {
    message: () => `密码长度为6位`,
  })
  @ApiProperty({ name: 'password', description: '用户密码' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: '验证码ID不能为空' })
  @ApiProperty({ name: 'captchaId', description: '验证码ID' })
  @IsString()
  captchaId: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @ApiProperty({ name: 'captcha', description: '验证码' })
  @IsString()
  captcha: string;

  @ApiPropertyOptional({ description: '用户邮箱' })
  email?: string;

  @ApiPropertyOptional({ description: '用户手机' })
  phone?: number;

  @ApiPropertyOptional({ description: '用户权限' })
  role?: string;
}
export class loginDto {
  id?: number;
  role?: string;
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ name: 'username', description: '用户名称' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, {
    message: () => `密码长度为6位`,
  })
  @ApiProperty({ name: 'password', description: '用户密码' })
  @IsString()
  password: string;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}
