import { Type } from 'class-transformer';
import { ArticleStatus } from './article-status.enum';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  IsUUID,
} from 'class-validator';

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

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: number;

  @IsOptional()
  image: string;
}
