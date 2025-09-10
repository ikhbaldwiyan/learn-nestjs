import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleStatus } from './dto/article-status.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: CreateArticleDto
  })
  create(
    @Body() createDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articleService.create(createDto, file);
  }

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({
    name: 'status',
    enum: ArticleStatus,
    required: false,
    description: 'Filter artikel berdasarkan status',
  })
  @ApiQuery({ name: 'keyword', required: false })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId: string,
    @Query('status') status: ArticleStatus,
    @Query('keyword') keyword?: string,
  ) {
    return this.articleService.findAll(
      { page, limit, route: '/articles' },
      userId,
      status,
      keyword,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articleService.update(id, updateDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
