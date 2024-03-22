import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './entity/billing.entity';
import { Inventory } from 'src/inventory/entity/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, Inventory])],
  providers: [BillingService],
  controllers: [BillingController]
})
export class BillingModule {}
