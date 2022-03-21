import { Body, Controller, Delete, Get, HttpStatus, Param, Post , Request} from '@nestjs/common';
import { CartDTO } from './cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @Post('add')
    async add(@Body() data: CartDTO, @Request() req){
        const token=req.headers['authorization'].split(' ')[1]
        return {
            
            data: await this.cartService.addProduct(data,token),

        }
    }

    @Delete('delete')
    async deleteProduct(@Body() data:Partial<CartDTO>, @Request() req){
        const token=req.headers['authorization'].split(' ')[1]
        const res= this.cartService.removeProduct(data,token);
        
        return{
            
            data: await this.cartService.removeProduct(data,token)
        }
    }
    @Delete('deleteall')
    async deleteall(){
        return await this.cartService.deleteAll()
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
