import { ArticleStatus } from './article-status.enum';
import { IsEnum, IsNotEmpty, IsOptional, isString, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(ArticleStatus)
  @IsOptional()
  status?: ArticleStatus = ArticleStatus.DRAFT;

  @IsString()
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: string;
}
