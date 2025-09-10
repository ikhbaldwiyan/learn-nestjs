import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArticleStatus } from './article-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    enum: ArticleStatus,
    description: 'Filter artikel berdasarkan status',
  })
  @IsEnum(ArticleStatus)
  @IsOptional()
  status?: ArticleStatus = ArticleStatus.DRAFT;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image: string;
}
