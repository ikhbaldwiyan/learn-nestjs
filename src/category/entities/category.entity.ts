import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryStatus } from "../dto/category-status.enum";
import { Article } from "../../articles/entities/article.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: CategoryStatus,
    default: CategoryStatus.ACTIVE
  })
  status: string

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[]
}
