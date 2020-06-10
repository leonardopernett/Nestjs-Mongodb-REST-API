import { Injectable } from '@nestjs/common';
import {Product} from './interface/product.interface'
import {CreateProductDto} from'./dto/product.dto';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose';
import {resolve} from 'path';
import {unlink} from 'fs-extra'

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly modelProduct:Model<Product>){

    }

  async getProduct():Promise<Product[]> {
     return  await this.modelProduct.find();
  }

  async getOneProduct(id:string){
      return await this.modelProduct.findOne({_id:id});
  }

  async createProduct(product:CreateProductDto){
       const prod = new this.modelProduct(product);
       return await prod.save();
  }

  async deleteProduct(id:string){
     const product = await this.modelProduct.findByIdAndDelete(id);
     return await unlink(resolve('./dist/public'+product.imageUrl))
  }

  async updateProduct(id:string , createProductDto:CreateProductDto){
    const product =  await this.modelProduct.findById(id);
     await unlink(resolve('./dist/public'+product.imageUrl))
     return await this.modelProduct.findByIdAndUpdate(id,createProductDto)
  } 
    
}
