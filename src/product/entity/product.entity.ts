import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.product)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ unique: true })
    code: string;

    @Column()
    barcode: string;

    @Column()
    name: string;

    @Column()
    printName: string;

    @Column({type: 'decimal', precision: 10, scale: 2 })
    purchasePrice: number;

    @Column()
    taxPercentage: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    mrp: number;

    @Column({type: 'decimal', precision: 10, scale: 2 })
    retailPrice: number;

    @Column({type: 'decimal', precision: 10, scale: 2 })
    wholesalePrice: number;

    @Column()
    category: string;

    @Column()
    manufacturer: string;

    @Column()
    hsnCode: string;

    @Column()
    unitDescription: string;

    @Column()
    openingStock: number;

    @Column()
    inStock: number;

    @Column()
    reOrderQty: number;

    @Column()
    maxStockQty: number;

    @Column()
    location: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @Column()
    createdBy: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedOn: Date;

    @Column()
    updatedBy: number
}
