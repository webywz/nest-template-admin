import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
