import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entity/inventory.entity';
import { CreateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) { }

    async create(createInventoryDto: CreateInventoryDto, userId: number): Promise<Inventory> {
        const latestTransaction = await this.inventoryRepository.findOne({
            order: { transactionId: 'DESC' }, where: {}
        });
        let transactionNumber = 1; // Extract the numeric part from the latest transactionId
        if (latestTransaction) {
            const latestNumber = parseInt(latestTransaction.transactionId.slice(2), 10);
            if (!isNaN(latestNumber)) {
                transactionNumber = latestNumber + 1;
            }
        }
        const newTransactionId = `TR${transactionNumber.toString().padStart(3, '0')}`;    // Format the new transactionId

        const inventory = this.inventoryRepository.create({
            ...createInventoryDto,
            transactionId: newTransactionId,
            createdBy: userId
        });// Create new inventory object

        return await this.inventoryRepository.save(inventory);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Inventory[]; total: number }> {
        const [inventory, total] = await this.inventoryRepository.findAndCount({
            // select: ['id'],
            take: limit,
            skip: (page - 1) * limit,
        });
        return { data: inventory, total };
    }

    async findOne(id: number): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne({ where: { id } });
        if (!inventory) {
            throw new NotFoundException('Inventory not found');
        }
        return inventory;
    }

    async update(id: number, userId: number, updateInventoryDto: CreateInventoryDto): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne({ where: { id } });
        if (!inventory) {
            throw new NotFoundException('Inventory not found');
        }
        inventory.updatedBy = userId;
        this.inventoryRepository.merge(inventory, updateInventoryDto);
        return await this.inventoryRepository.save(inventory);
    }

    async remove(id: number): Promise<any> {
        const inventory = await this.findOne(id);
        await this.inventoryRepository.remove(inventory);
        return {message: `Id ${id} successfully deleted`}
    }
}
