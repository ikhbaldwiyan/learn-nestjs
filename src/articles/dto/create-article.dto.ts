import { ArticleStatus } from './article-status.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, isString, IsString, IsUUID } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: number;
}
