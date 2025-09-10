import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content here...' })
  content?: string;

  @ApiPropertyOptional({ example: 1 })
  categoryId?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image?: any;

  @ApiPropertyOptional({ type: 'string', format: 'uuid' })
  userId?: any;
}
