import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../dto/create-user.dto';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER, // 默认角色为普通用户
  })
  role: string;
}
