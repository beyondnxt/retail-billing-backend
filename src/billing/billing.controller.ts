import { Controller, Post, Get, Body, Param, Put, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/billing.dto';
import { Billing } from './entity/billing.entity';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) { }

  @Post()
  async create(@Body() createBillingDto: CreateBillingDto, @Req() req: Request): Promise<Billing> {
    try {
      const userId = req.headers['userid'];
      return this.billingService.create(createBillingDto, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    try {
      return this.billingService.find(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<{ data: any[]; total: number }> {
    try {
      return this.billingService.findAll(page, limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBillingDto: CreateBillingDto): Promise<Billing> {
    try {
      return this.billingService.update(id, updateBillingDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return this.billingService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
