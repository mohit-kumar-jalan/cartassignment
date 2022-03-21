import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Max } from "class-validator";


export class SignupDTO{
    @IsString()
    @IsNotEmpty()
    readonly contact: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
    @IsNotEmpty()
    readonly isAdmin: boolean;
    
}