import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn({type: 'bigint'})
    contact: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    
    
}