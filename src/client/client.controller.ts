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
  Query,
} from '@nestjs/common';
import { clientServices } from './client.service';

import { updateClientDto } from 'src/dtos/client/update.dto';

import { Client } from 'src/entity/client.entity';
import { createClientDto } from 'src/dtos/client/create.dto';
 
 


@Controller('client')
 
export class clientController {
  constructor(private clientServices: clientServices) { }

  // get one client by its id

  @Get(':id')
  async getOneClient(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Client> {
    return await this.clientServices.getOneClient(id);
  }
  // get all cleint
  @Get()
  async getClient() {
    return await this.clientServices.getALLClient();
  }

  // create client
  @Post( )
  @UsePipes(new ValidationPipe())
  async create(@Body() data: createClientDto) {
    return await this.clientServices.createClient(data);
  }

  // update client by its id
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateClientDto,
  ) {
    const res = await this.clientServices.updateClient(id, data);
    console.log(res)
    if (res.affected < 1) {
      throw new BadRequestException('something went wrong please try again later');
    }
    return {
      message: 'successfully updated'
    };
  }

   //delete client with id
   @Delete(':id')
   async delete(@Param('id',ParseIntPipe)id:number){
          await this.clientServices.deleteclient(id)
   }


   @Get('company/get')
    async companyClients(@Query('companyId',ParseIntPipe) companyId:number){
          return this.clientServices.getCompanyClients(companyId)
    }
}
