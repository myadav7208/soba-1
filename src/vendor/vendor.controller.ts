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
  Delete,
  Query
} from '@nestjs/common';
import { vendorServices } from './vendor.service';
 
import { updateVendorDto } from 'src/dtos/vendor/update.dto';  
 
import { vendor} from 'src/entity/vendor.entity';
import { createVendorDto } from 'src/dtos/vendor/create.dto';
 

@Controller('vendor')
export class vendorController {
  constructor(private vendorServices: vendorServices) {}

  // get one vendor by its id

  @Get(':id')
  async getVendor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<vendor> {
    return await this.vendorServices.getOnevendor(id);
  }
  // get all vendor
  @Get()
  async getVendors() {
    return await this.vendorServices.getALLvendor();
  }

  // create vendor
  @Post( )
  @UsePipes(new ValidationPipe())
  async create(@Body() data: createVendorDto) {
    return await this.vendorServices.createvendor(data);
  }

  // update vendor by its id
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateVendorDto,
  ) {
    return await this.vendorServices.updatevendor(id, data);
    
     
  }


   //delete vendor with id
   @Delete(':id')
   async delete(@Param('id',ParseIntPipe)id:number){
          await this.vendorServices.deleteVendor(id)
   }


   @Get('company/get')
   async companyClients(@Query('companyId',ParseIntPipe) companyId:number){
         return this.vendorServices.getCompanyVendors(companyId)
   }
}
