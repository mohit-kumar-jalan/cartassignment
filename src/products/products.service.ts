import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDTO } from './products.dto';
import { ProductsEntity } from './products.entity';
import {helperFunction} from '../common/helperfunction';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
  ) {}

  async createProduct(data: ProductsDTO) {
    const check=await this.productRepository.find(data);
    if(check.length===0){
    const product = this.productRepository.create(data);
    await this.productRepository.save(data);
    return {statusCode: HttpStatus.OK,
      message: 'Product added successfully',product};
    }
    else{
      return {
        message: "product already exist"
      }
    }
  }

  async getAll() {
    return await this.productRepository.find();
  }

  async page(start,limit){
    const a= await this.productRepository.find()
    const res=helperFunction.pagination(start,limit,a)
    return res;
  }

  getOne(id: number){
      return  this.productRepository.findOne({where: {id: id}});
  }

  async update(id: number, data: Partial<ProductsDTO>) {
    const check=Boolean(await this.productRepository.findOne({where: {id: id}}))
    if(check){
    await this.productRepository.update({ id }, data);
    return { 
      updated: true
    }
    }
    else{
      return {
        updated: false
      }
    }
  }

  async delete(id: number) {
    const check=Boolean(await this.productRepository.findOne({where: {id: id}}))
    //console.log(check);
    if(check){
    await this.productRepository.delete({ id });
    return { deleted: true };
    }
    else{
      return{
        deleted: false
      }
    }
  }
 
}
