import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import { CartController } from './cart.controller';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]),TypeOrmModule.forFeature([CartEntity]),JwtModule.register({
    secret: 'key',
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
