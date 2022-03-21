import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';
import { ProductsEntity } from './products/products.entity';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartEntity } from './cart/cart.entity';
import { TokenEntity } from './auth/token.entity';



@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Toothsi@1234',
  database: 'product',
  entities: [ProductsEntity,UserEntity,CartEntity,TokenEntity],
  synchronize: true}),ProductsModule,UserModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
