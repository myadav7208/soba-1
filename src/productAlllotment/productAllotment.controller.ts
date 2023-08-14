import {
  Body,
  Controller,
  BadRequestException,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Put,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { productAllotmentServices } from './productAllotment.service';
import  {createProductAllotmentDto} from 'src/dtos/productAllotment/create.dto';
import { updateProductAllotmentDto } from 'src/dtos/productAllotment/update.dto';
import { productAllotment } from 'src/entity/productAllotment.entity';
 
import { Public } from '../auth/public.decorator';
 
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
      
    return await this.productAllotmentServices.getAllAllotedProduct();
  }

  // create productAllotment
  @Post()
  // @UsePipes(new ValidationPipe())
  async create(@Body() data: createProductAllotmentDto) {
    
    return await this.productAllotmentServices.createAllotedProduct(data);
  }

  // update productAllotment by its id
  @Put(':id')
  
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<updateProductAllotmentDto>) {
    try {
        console.log(
          !data
        )
      return await this.productAllotmentServices.updateAllotedProduct(id, data);
    } catch (err) {
      throw new BadRequestException('something went wrong please try again');
    }
  }

   //delete productAllotment with id
   @Delete('delete/:id')
   async delete(@Param('id',ParseIntPipe)id:number){
          await this.productAllotmentServices.deleteAllotedProduct(id)
   }
}
