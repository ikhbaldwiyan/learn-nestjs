import { Article } from '../../articles/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar", select: false })
  password?: string;

  @OneToMany(() => Article, (article) => article.author)
  articles?: Article[];
}
