import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { CartDTO } from './cart.dto';
import { CartEntity } from './cart.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { parse, stringify } from 'flatted';

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
        try{
            this.jwtService.verify(data.accessToken)
        const find= await this.productRepository.find({where: {id: data.id, name: data.name, price: data.price}});
        /*const verify = await  this.verify(data.accessToken)
        console.log(verify)*/
        if (find.length!=0){
            const create = this.cartRepository.create(data)
            this.cartRepository.save(data)
            return {
                statusCode: HttpStatus.OK,
                message: 'Product added to cart',
            };
        }
        else{
            return{
                statusCode: HttpStatus.NOT_FOUND,
                message: "Product not exist"
            }
        }
    }
        catch(error){
                const e = parse(stringify(error));
                if (e.name === 'TokenExpiredError') {
                  return {
                    message: 'Token expired',
                  };
                }
                else {
                    return {
                      message: 'access token not valid',
                    };
                  }
        }
    }

    async removeProduct(data: Partial<CartDTO>){
        try{
            this.jwtService.verify(data.accessToken)
        const find= await this.cartRepository.find({where: {id: data.id}});

        if(find.length!=0){
         this.cartRepository.delete(data.id);
        return{
            statusCode: HttpStatus.OK,
            message: 'Product deleted from cart',
        }
    }
    else{
        return{
            statusCode: HttpStatus.NOT_FOUND,
            message: "Product not in the cart"
        }
    }
}
catch(error){
    const e = parse(stringify(error));
    if (e.name === 'TokenExpiredError') {
      return {
        message: 'Token expired',
      };
    }
    else {
        return {
          message: 'access token not valid',
        };
      }
}

    }

    async getCart(){
        return await this.cartRepository.find()
    }

    async payment(amount: number){
        const sum= await this.cartRepository.query('select sum(price) from cart;');
        //console.log(typeof sum[0]["sum(price)"])
        //const login=this.verify
        if(+sum[0]["sum(price)"]===amount){
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
    async deleteAll(){
        const find= await this.cartRepository.find()
        if(find.length){
            this.cartRepository.query('delete from cart')
            return {
                deleted: true,
                message: "All products deleted"
            }

        }
        else{
            return{
                deleted: false,
                message: "Cart is empty"
            }
        }
    }
}
