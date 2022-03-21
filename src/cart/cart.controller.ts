import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CartDTO } from './cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @Post('add')
    async add(@Body() data: CartDTO){
        return {
            statusCode: HttpStatus.OK,
            data: await this.cartService.addProduct(data),

        }
    }

    @Delete('delete')
    async deleteProduct(@Body() data:CartDTO){
        const res= this.cartService.removeProduct(data);
        
        return{
            statusCode: HttpStatus.OK,
            data: await this.cartService.removeProduct(data)
        }
    }
    

    @Get()
    async showAll(){
            return{
                statusCode: HttpStatus.OK,
                data: await this.cartService.getCart()
            }
    }

    @Post(':amount')
    async amount(@Param('amount') amount: number){
        const val = await this.cartService.payment(amount)
        //console.log(val)
        if(val.success){
            return {
                message: 'payment success'
            }
        }
        else{
            return {
                message:'Payment failed'
            }
        }
    }


}
