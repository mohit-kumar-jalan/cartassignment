import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CartDTO{
    @IsNotEmpty()
    @IsNumber()
    id: number;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    price: number;
    @IsNotEmpty()
    readonly accessToken: string
}