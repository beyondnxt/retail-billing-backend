import { Injectable, NotFoundException } from '@nestjs/common';
import { Billing } from './entity/billing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillingDto } from './dto/billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) { }

  async create(createBillingDto: CreateBillingDto, userId: number): Promise<Billing> {
    const latestBilling = await this.billingRepository.findOne({ order: { billId: 'DESC' }, where: {} });
    const lastId = latestBilling ? parseInt(latestBilling.billId.replace('BILL', ''), 10) : 0;
    const newId = `BILL${(lastId + 1).toString().padStart(3, '0')}`;

    const billing = this.billingRepository.create({
      ...createBillingDto,
      billId: newId,
      createdBy: userId
    });

    return await this.billingRepository.save(billing);
  }

  async find(id: number): Promise<Billing> {
    const billing = await this.billingRepository.findOne({ where: { id } });
    if (!billing) {
      throw new NotFoundException(`Billing id ${id} not found`);
    }
    return billing;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: any[]; total: number }> {
    const [billings, total] = await this.billingRepository.findAndCount({
      relations: ['inventory'],
      take: limit,
      skip: (page - 1) * limit
    });
    const formattedBillings = billings.map(billing => ({
      bill_id: billing.billId,
      date: billing.date,
      customer_name: billing.customerName,
      inventory: Array.isArray(billing.inventory) ? billing.inventory.map(item => ({
        productCode: item.productCode,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })) : [{
        product_code: billing.inventory.productCode,
        quantity: billing.inventory.quantity,
        unit_price: billing.inventory.unitPrice,
        total_price: billing.inventory.totalPrice
      }],
      subtotal: billing.subtotal,
      totalAmount: billing.totalAmount,
      paymentMethod: billing.paymentMethod,
      cashReceived: billing.cashReceived,
      change: billing.change
    }));

    return { data: formattedBillings, total };
  }

  async update(id: number, updateBillingDto: CreateBillingDto): Promise<Billing> {
    const billing = await this.billingRepository.findOne({ where: { id } });
    if (!billing) {
      throw new NotFoundException(`Billing id ${id} not found`);
    }
    await this.billingRepository.update(id, updateBillingDto);
    return billing;
  }

  async remove(id: number): Promise<any> {
    const bill = await this.find(id);
    await this.billingRepository.remove(bill);
    return { message: `id ${id} deleted successfully ` }
  }


}
