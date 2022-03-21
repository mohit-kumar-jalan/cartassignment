import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('cart')
export class CartEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;
    
}