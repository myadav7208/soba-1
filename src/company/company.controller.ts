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
import { companyServices } from './company.service';
import { createCompanyDto } from 'src/dtos/company/create.dto';
import { updateCompanyDto } from 'src/dtos/company/update.dto';
import { Company } from 'src/entity/company.entity';
import { ResponseFormatInterceptor } from '../middlewares/response-format.middleware';
import { Public } from '../auth/public.decorator';
 
@Controller('company')
 
export class companyController {
  constructor(private companyServices: companyServices) { }

  // get one company by its id
  @Get(':id')
  async getOneComapany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return await this.companyServices.getCompany(id);
  }

  // get all company
  @Get()
  @Public()
  async getCompany() {
      
    return await this.companyServices.getCompanies();
  }

  // create company
  @Post()
  // @UsePipes(new ValidationPipe())
  async create(@Body() data: createCompanyDto) {
    
    return await this.companyServices.createCompany(data);
  }

  // update company by its id
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: updateCompanyDto) {
    try {
      return await this.companyServices.updateCompany(id, data);
    } catch (err) {
      throw new BadRequestException('something went wrong please try again');
    }
  }

   //delete company with id
   @Delete('delete/:id')
   async delete(@Param('id',ParseIntPipe)id:number){
          await this.companyServices.deleteCompany(id)
   }
}
