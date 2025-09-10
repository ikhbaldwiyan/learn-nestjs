import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleStatus } from '../dto/article-status.enum';
import { User } from '../../user/entites/user.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true})
  image?: string;

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
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @Column({
    type: 'uuid',
  })
  userId: string;

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;

  @Column({ type: 'int' })
  categoryId: number;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[]
}
