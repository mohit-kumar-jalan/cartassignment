import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('product')
export class ProductsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;
    
}