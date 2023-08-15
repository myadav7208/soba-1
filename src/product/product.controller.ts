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
  Query,
} from '@nestjs/common';
import { productServices } from './product.service';
 
import {updateProductDto} from 'src/dtos/product/update.dto';  
 
import { product} from 'src/entity/product.entity';
import { createProductDto } from 'src/dtos/product/create.dto';
 

@Controller('product')
export class productController {
  constructor(private productServices: productServices) {}

  // get one product by its id

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<product> {
    return await this.productServices.getOneProduct(id);
  }
  // get all product
  @Get()
  async getProducts() {
    return await this.productServices.getALLProduct();
  }

  // create product
  @Post( )
   
  async create(@Body() data: createProductDto) {
    return await this.productServices.createProduct(data);
  }

  // update product by its id
  @Put(':id')
 
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateProductDto,
  ) { 
    try {
      return await this.productServices.updateProduct(id, data);
    } catch (err) {
      throw new BadRequestException('something went wrong please try again');
    }
  }

  //delete product with id
  @Delete(':id')
  async delete(@Param('id',ParseIntPipe)id:number){
       return this.productServices.deleteProduct(id)
  }

  @Get('product/get')
  async companyClients(@Query('companyId',ParseIntPipe) companyId:number){
        return this.productServices.getCompanyProducts(companyId)
  }
}
