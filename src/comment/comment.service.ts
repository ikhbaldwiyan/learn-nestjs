import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Article } from '../articles/entities/article.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
  ) {}

  async createOrUpdateComment(
    createCommentDto: CreateCommentDto,
  ): Promise<{ message: string }> {
    const article = await this.articleRepo.findOne({
      where: {
        id: createCommentDto.articleId,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = await this.commentRepo.findOne({
      where: {
        articleId: createCommentDto.articleId,
        userId: createCommentDto.userId,
      },
    });

    if (!comment) {
      const newComment = this.commentRepo.create(createCommentDto);
      await this.commentRepo.save(newComment);

      return {
        message: 'Success send comment',
      };
    } else {
      await this.commentRepo.update(
        { articleId: article.id, userId: createCommentDto.userId },
        {
          message: createCommentDto.content,
        },
      );

      return {
        message: 'Success update comment',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
