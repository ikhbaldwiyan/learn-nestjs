import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../user/entites/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    const author = await this.userRepo.findOneBy({ id: dto.authorId });

    if (!author) {
      throw new NotFoundException("Author not found");
    }
  
    const article = this.articleRepo.create({
      ...dto,
      author,
    });
  
    return this.articleRepo.save(article);
  }
  

  async findAll(): Promise<Article[]> {
    return await this.articleRepo.find();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException(`Article ${id} not found`);
    return article;
  }

  async update(id: string, updateDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
  
    // If authorId is passed, fetch the user
    if (updateDto.authorId) {
      const author = await this.userRepo.findOneBy({ id: updateDto.authorId });
      if (!author) {
        throw new NotFoundException(`User with id ${updateDto.authorId} not found`);
      }
      article.author = author;
    }
  
    // Assign the rest of the fields (except authorId, we already handled it)
    const { authorId, ...rest } = updateDto;
    Object.assign(article, rest);
  
    return await this.articleRepo.save(article);
  }
  

  async remove(id: string): Promise<void> {
    const result = await this.articleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article ${id} not found`);
    }
  }
}
