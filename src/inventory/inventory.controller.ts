import { Controller, Get, Post, Body, Param, Delete, Req, Put, Query, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/inventory.dto';
import { Inventory } from './entity/inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto, @Req() req: Request): Promise<Inventory> {
    try {
      const userId = req.headers['userid'];
      return this.inventoryService.create(createInventoryDto, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<{ data: Inventory[]; total: number }> {
    try {
      return this.inventoryService.findAll(page, limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.inventoryService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateInventoryDto: CreateInventoryDto, @Req() req: Request) {
    try {
      const userId = req.headers['userid'];
      return this.inventoryService.update(id, userId, updateInventoryDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    try {
      return this.inventoryService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
