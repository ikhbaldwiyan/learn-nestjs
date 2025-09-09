import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../user/entites/user.entity';
import { ArticleStatus } from './dto/article-status.enum';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    try {
      const user = await this.userRepo.findOneBy({ id: dto.userId });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const article = this.articleRepo.create(dto);

      return this.articleRepo.save(article);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(
    options: IPaginationOptions,
    userId?: string,
    status?: ArticleStatus,
    keyword?: string,
  ): Promise<Pagination<Article>> {
    const queryBuilder = this.articleRepo
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .leftJoin('article.category', 'category')
      .select([
        'article.id',
        'article.title',
        'article.status',
        'article.createAt',
        'article.updatedAt',
        'user.id',
        'user.name',
        'user.email',
        'category.id',
        'category.name',
      ]);

    if (userId) {
      queryBuilder.andWhere('article.user = :userId', { userId });
    }

    if (status) {
      queryBuilder.andWhere('article.status = :status', { status });
    }

    if (keyword) {
      queryBuilder.andWhere('article.title ILIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    return paginate<Article>(queryBuilder, options);
  }

  async findOne(id: string): Promise<any> {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: ['user', 'category', 'comments', 'comments.user'],
    });

    if (!article) throw new NotFoundException(`Article ${id} not found`);

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      createAt: article.createAt,
      updatedAt: article.updatedAt,
      author: {
        id: article.user.id,
        name: article.user.name,
        email: article.user.email,
      },
      category: {
        id: article.category.id,
        name: article.category.name,
        status: article.category.status,
      },
      comments: article.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          email: comment.user.email,
        },
      })),
    };
  }

  async update(id: string, updateDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    Object.assign(article, updateDto);

    return await this.articleRepo.save(article);
  }

  async remove(id: string): Promise<any> {
    const result = await this.articleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article ${id} not found`);
    }

    return 'Article successfully delete';
  }
}
