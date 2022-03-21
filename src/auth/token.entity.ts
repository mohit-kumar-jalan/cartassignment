import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('token')
export class TokenEntity{

    @PrimaryGeneratedColumn()
    tokenVerified: string;
}