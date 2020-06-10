import { Controller, Get, Post, Put, Delete, Body, Req,Res, HttpCode, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {ProductService} from './product.service'
import { diskStorage } from 'multer'

import {extname, resolve} from 'path';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){}

@Get()
getProduct(){
    return this.productService.getProduct()
}

@Get(':id')
getOneProduct(@Param('id') id:string){
   return this.productService.getOneProduct(id)
}

// diskStorage
@UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
        destination:resolve('./dist/public/uploads'),
        filename:(req,file,cb)=>{
          cb(null, Date.now()+extname(file.originalname) )
        }
    })
}))

@HttpCode(200) 
@Post('/create')
 createProduct(@Res() res, @Body() createProductDto:CreateProductDto, @UploadedFile() image){
    const img = '/uploads/'+image.filename
    const {name, description, imageUrl,price,createdAt} = createProductDto
    const newProduct={
        name:name,
        description:description,
        imageUrl:img,
        price:price,
    }
    this.productService.createProduct(newProduct)
    return res.json('products created')
 }

 @Delete('/delete/:id')
 deleteTask(@Param('id') id:string, @Res() res){
    this.productService.deleteProduct(id);
    return res.json({
        message:'product deleted'
    })
 }


@UseInterceptors(FileInterceptor('image',{
     storage:diskStorage({
         destination:resolve('./dist/public/uploads'),
         filename:(req,file,cb)=>{
             cb(null, Date.now()+extname(file.originalname))
         }
     })
}))

@Put(':id/edit')
updateProduct(@Param('id') id:string, @Body() createProductDto:CreateProductDto, @UploadedFile() image){
    const img = '/uploads/'+image.filename
    const {name, description, price} = createProductDto
    const newProduct = {
        name:name,
        description:description,
        imageUrl:img,
        price:price
    }

    this.productService.updateProduct(id,newProduct);
    return {
        message:'product updated'
    }
}

 
}
