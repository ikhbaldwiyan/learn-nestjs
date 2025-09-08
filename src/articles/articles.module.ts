import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user/user.service';
import { User } from '../user/entites/user.entity';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, UserService],
  imports: [TypeOrmModule.forFeature([Article, User])],
})
export class ArticlesModule {}
