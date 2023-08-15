import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Get,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { updateCompanyDto } from 'src/dtos/company/update.dto';
import { Company } from 'src/entity/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class companyServices {
  constructor(
    @InjectRepository(Company)
    private readonly company: Repository<Company>,
  ) {}
  async getCompany(id: number) {
    const company = await this.company.findOne({
      where: {
        companyId: id,
      },
      relations: ['clients', 'products'],
    });
    if (!company) {
      throw new NotFoundException('company does not exist');
    }
    return company;
  }
  async getCompanies(): Promise<Company[]> {
    return await this.company.find();
  }
  async createCompany(data) {
    return await this.company.save(data);
  }

  async updateCompany(id: number, data: Partial<updateCompanyDto>) {
    try {
     
      return await this.company.update({ companyId: id }, data);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteCompany(id: number) {
    return await this.company.delete({ companyId: id });
  }
}
