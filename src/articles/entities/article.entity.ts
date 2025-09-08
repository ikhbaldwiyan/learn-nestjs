import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleStatus } from '../dto/article-status.enum';
import { User } from '../../user/entites/user.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: "text"})
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
  })
  status: string;

  @CreateDateColumn()
  readonly createAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  // ✅ Many-to-one: Many articles can belong to one user
  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;
}
