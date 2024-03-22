import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus, Req, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async create(@Body() categoryData: Partial<Category>, @Req() req: Request): Promise<Category> {
    try {
      const userId = req.headers['userid'];
      return this.categoryService.create(categoryData, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<{ data: Category[]; total: number }> {
    try {
      return this.categoryService.findAll(page, limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category | undefined> {
    try {
      return this.categoryService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() categoryData: Partial<Category>, @Req() req: Request): Promise<Category | undefined> {
    try {
      const userId = req.headers['userid'];
      return this.categoryService.update(id, categoryData, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return this.categoryService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
