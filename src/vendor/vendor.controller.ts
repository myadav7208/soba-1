import {
  Body,
  Controller,
  NotFoundException,
  BadRequestException,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete
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
  async getOnevendor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<vendor> {
    return await this.vendorServices.getOnevendor(id);
  }
  // get all vendor
  @Get()
  async getvendor() {
    return await this.vendorServices.getALLvendor();
  }

  // create vendor
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() data: createVendorDto) {
    return await this.vendorServices.createvendor(data);
  }

  // update vendor by its id
  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateVendorDto,
  ) {
    const res = await this.vendorServices.updatevendor(id, data);
    
    if (res.affected <1) {
      throw new BadRequestException('something went wrong please try again later');
    }
    return {
      message: 'successfully updated'
    };
  }


   //delete vendor with id
   @Delete('delete/:id')
   async delete(@Param('id',ParseIntPipe)id:number){
          await this.vendorServices.deleteVendor(id)
   }
}
