import { Article } from '../../articles/entities/article.entity';
import { User } from '../../user/entites/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Article, (article) => article.id)
  article: Article;

  @Column({ type: 'uuid' })
  articleId: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @CreateDateColumn()
  readonly updatedAt!: Date;
}
