import { IsEmail, IsNotEmpty } from 'class-validator';
import { Product } from 'src/product/entity/product.entity';
import { Role } from 'src/role/entity/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    phoneNumber: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ name: 'roleId' })
    roleId: number

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @Column()
    status: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @Column()
    createdBy: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedOn: Date;

    @Column()
    updatedBy: number

    @OneToMany(() => Product, product => product.user)
    product: Product[];

}