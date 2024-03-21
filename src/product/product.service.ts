// product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({where:{id}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    const lastProduct = await this.productRepository.findOne({ order: { code: 'DESC' }, where: {}  });
    const lastCode = lastProduct ? parseInt(lastProduct.code.replace('P', '')) : 0;
    const newCode = `P${(lastCode + 1).toString().padStart(3, '0')}`;
    const product = this.productRepository.create({
      ...createProductDto,
      code: newCode,
      createdBy: userId
    });
    return await this.productRepository.save(product);
  }
  

  async update(id: number, updateProductDto: CreateProductDto): Promise<Product> {
    const product = await this.findById(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.findById(id);
    await this.productRepository.remove(product);
  }
}