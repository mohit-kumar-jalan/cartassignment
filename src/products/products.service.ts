import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination,IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { ProductsDTO } from './products.dto';
import { ProductsEntity } from './products.entity';

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
 
  paginate(options: IPaginationOptions){
    const queryBuilder = this.productRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'DESC');
    return paginate<ProductsEntity>(queryBuilder, options)
  }

}
