import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { productSchema } from './product/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs'), 
    ProductModule,
    MongooseModule.forFeature([{name:'Product', schema:productSchema}])
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
