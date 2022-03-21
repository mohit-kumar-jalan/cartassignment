import { Injectable } from '@nestjs/common';
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
    const product = this.productRepository.create(data);
    await this.productRepository.save(data);
    return product;
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
    await this.productRepository.update({ id }, data);
    return await this.productRepository.findOne({ id });
  }

  async delete(id: number) {
    await this.productRepository.delete({ id });
    return { deleted: true };
  }
 
}
