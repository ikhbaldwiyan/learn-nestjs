import { Profile } from '../../profile/entities/profile.entity';
import { Article } from '../../articles/entities/article.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "varchar"})
  password?: string;

  @OneToMany(() => Article, (article) => article.id)
  articles?: Article[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile?: Profile;
}
