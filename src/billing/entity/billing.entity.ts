import { Inventory } from 'src/inventory/entity/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'billing' })
export class Billing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    billId: string;

    @Column()
    inventoryId: number;

    @ManyToOne(() => Inventory, inventory => inventory.billing)
    @JoinColumn({ name: 'inventoryId' })
    inventory: Inventory;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    date: string;

    @Column()
    customerName: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalAmount: number;

    @Column()
    paymentMethod: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    cashReceived: number | null;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    change: number | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @Column()
    createdBy: number
}

