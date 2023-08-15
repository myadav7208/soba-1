import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { updateProductAllotmentDto } from 'src/dtos/productAllotment/update.dto';
import { Company } from 'src/entity/company.entity';
 
import {   productAllotment } from 'src/entity/productAllotment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class productAllotmentServices {
  constructor(
    @InjectRepository(productAllotment)
    private readonly  productAllotment: Repository<productAllotment>,
  ) {}
  async getAllotedProduct(id: number) {
    const company = await this.productAllotment.findOne({
      where: {
        productAllotmentId: id,
      },
    });
     
    return company;
  }
  async getAllotedProducts(): Promise<productAllotment[]> {
    return await this.productAllotment.find();
  }
  async createAllotedProduct(data) {
    return await this.productAllotment.save(data);
  }

  async updateAllotedProduct(
    id: number,
    data: Partial<updateProductAllotmentDto>,
  ) {
    try {
      
      return await this.productAllotment.update({ productAllotmentId: id }, data);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAllotedProduct(id: number) {
    return await this.productAllotment.delete({ productAllotmentId: id });
  }
}
