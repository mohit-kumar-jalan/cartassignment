import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProductsDTO } from './products.dto';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

    @Post()
    async create(@Body() data: ProductsDTO){
        return {
            
            data: await this.productsService.createProduct(data),

        }
    }

    @Get()
    async showAll(){
        return{
            statusCode: HttpStatus.OK,
            data: await this.productsService.getAll()
        }
    }
    @Get('path')
    async show(@Query() {start,limit}){
        return this.productsService.page(start,limit)
    }


    @Get(':id')
    async showOne(@Param('id')id: number){
        return {
            statusCode: HttpStatus.OK,
            data: await this.productsService.getOne(id),
          };
    }

    @Put(':id')
    async updateProduct(@Param('id') id: number, @Body() data: Partial<ProductsDTO>){
        const val=await this.productsService.update(id,data)
        if(val.updated){
        return {
            statusCode: HttpStatus.OK,
            message: 'Product updated successfully',
            data: await this.productsService.update(id,data)
        }
    }
    else{
        return{
            message: 'Product not found'
        }
    }
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number){
        const val=await this.productsService.delete(id);
        if(val.deleted){
            return{message: "product deleted"}
            }
        
        else{
            return{
                    message: "product not available"
            }
        }
    }
    
}
