import { Injectable } from '@nestjs/common';
import { CreateUserDto, loginDto, RegisterUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(user: CreateUserDto) {
    const data = await this.userRepository.save(user);
    return {
      message: '注册成功',
      result: {
        id: data.id,
        username: data.username,
      },
    };
  }

  async login(user: loginDto) {
    const loginUser = await this.userRepository.findOneBy({
      username: user.username,
      password: user.password,
    });
    return {
      result: {
        name: loginUser.username,
        access_token: this.jwtService.sign({
          username: user.username,
          id: user.id,
        }),
      },
    };
  }
}
