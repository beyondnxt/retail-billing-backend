import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto,@Req() req: Request): Promise<Product> {
    const userId = req.headers['userid'];
    return this.productService.create(createProductDto,userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: CreateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}

