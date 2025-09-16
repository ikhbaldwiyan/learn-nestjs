import { User } from '../../user/entites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  age: number;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ nullable: true })
  image?: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
