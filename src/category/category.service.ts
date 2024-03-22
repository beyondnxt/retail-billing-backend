import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(categoryData: Partial<Category>, userId: number): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    category.createdBy = userId;
    return await this.categoryRepository.save(category);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Category[]; total: number }> {
    const [categories, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { data: categories, total };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, categoryData: Partial<Category>, userId: number): Promise<Category | undefined> {
    const existingCategory = await this.categoryRepository.findOne({ where: { id } });
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    existingCategory.updatedBy = userId
    const updatedCategory = Object.assign(existingCategory, categoryData);
    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<any> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return { message: `Id ${id} successfully deleted` }
  }
}
