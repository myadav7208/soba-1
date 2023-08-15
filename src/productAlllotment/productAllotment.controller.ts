import {
  Body,
  Controller,
  BadRequestException,
  Param,
  ParseIntPipe,
  Post,
  Get,
  
  Put,
   
  Delete,
  UseFilters,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { productAllotmentServices } from './productAllotment.service';
import  {createProductAllotmentDto} from 'src/dtos/productAllotment/create.dto';
import { updateProductAllotmentDto } from 'src/dtos/productAllotment/update.dto';
import { productAllotment } from 'src/entity/productAllotment.entity';
 
import { Public } from '../auth/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
 import { storage } from './storage.config';
 
@Controller('productAllotment')
 
export class productAllotmentController {
  constructor(private productAllotmentServices: productAllotmentServices) { }

  // get one productAllotment by its id
  @Get(':id')
  async getOneAllotedProduct(@Param('id', ParseIntPipe) id: number): Promise<productAllotment> {
    return await this.productAllotmentServices.getAllotedProduct(id);
  }

  // get all productAllotment
  @Get()
  @Public()
  async getproductAllotment() {
      
    return await this.productAllotmentServices.getAllotedProducts();
  }

  // create productAllotment
  @Post()
   
  async create(@Body() data: createProductAllotmentDto) {
    
    return await this.productAllotmentServices.createAllotedProduct(data);
  }

  // update productAllotment by its id
  @Put(':id')
  
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<updateProductAllotmentDto>) {
    try {
        
      return await this.productAllotmentServices.updateAllotedProduct(id, data);
    } catch (err) {
      throw new BadRequestException('something went wrong please try again');
    }
  }

   //delete productAllotment with id
   @Delete(':id')
   async delete(@Param('id',ParseIntPipe)id:number){
         return await this.productAllotmentServices.deleteAllotedProduct(id)
   }


   // file uploading using multer 
   @Post('upload')
   
   @UseInterceptors(
     FileInterceptor(
       "file",  
       { storage }
     )
   )
   async upload(@UploadedFile() file:Express.Multer.File) {
     return file;
   }
 }

