import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { CartDTO } from './cart.dto';
import { CartEntity } from './cart.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,

    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private readonly jwtService: JwtService
    ){}

    async verify(accessToken){
        if(this.jwtService.verify(accessToken))
        return true
        else
        return false
    }
    async addProduct(data: CartDTO){
        const find= await this.productRepository.find({where: {id: data.id, name: data.name, price: data.price}});
        const verify = this.verify
        if (find.length!=0 && verify){
            const create = this.cartRepository.create(data)
            this.cartRepository.save(data)
            return {
                message: 'Product added to cart',
            };
        }
        else{
            return{
                message: "Product not exist or user not logged in"
            }
        }
    }

    async removeProduct(data:CartDTO){
        const find= await this.cartRepository.find({where: {id: data.id, name: data.name, price: data.price}});
        const verify = this.verify
        if(find.length!=0 && verify){
         this.cartRepository.delete(data.id);
        return{
            message: 'Product deleted from cart',
        }
    }
    else{
        return{
            message: "Product not in cart or user not logged in"
        }
    }

    }

    async getCart(){
        return await this.cartRepository.find()
    }

    async payment(amount: number){
        const sum= await this.cartRepository.query('select sum(price) from cart;');
        //console.log(typeof sum[0]["sum(price)"])
        const login=this.verify
        if(+sum[0]["sum(price)"]===amount && login){
           //console.log(sum)
            return{
                success: true
            }
        }
        else{
            return {
                success: false
            }
        }
    
}
}
