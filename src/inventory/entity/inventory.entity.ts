import { Billing } from 'src/billing/entity/billing.entity';
import { Product } from 'src/product/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'inventory' })
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    transactionId: string;

    @Column()
    productCode: string;

    @ManyToOne(() => Product, product => product.inventory)
    @JoinColumn({ name: 'productCode', referencedColumnName: 'code' })
    product: Product;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    date: string;

    @Column()
    type: string;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @Column()
    location: string;

    @Column()
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @Column()
    createdBy: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedOn: Date;

    @Column()
    updatedBy: number

    @OneToMany(() => Billing, billing => billing.inventory)
    billing: Billing[];

}
