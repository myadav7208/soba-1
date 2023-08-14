import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { updateVendorDto } from 'src/dtos/vendor/update.dto';

import { vendor } from 'src/entity/vendor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class vendorServices {
  constructor(
    @InjectRepository(vendor)
    private readonly vendor: Repository<vendor>,
  ) {}
  async getOnevendor(id: number) {
    const vendor = await this.vendor.findOne({
      where: {
        vendorId: id,
      },
    });
    if (!vendor) {
      throw new NotFoundException('vendor does not exist');
    }
    return vendor;
  }
  async getALLvendor(): Promise<vendor[]> {
    const allVendor = await this.vendor.find();

    if (!allVendor.length) {
      throw new NotFoundException('no vendor found');
    }
    return allVendor;
  }
  async createvendor(data) {
    return await this.vendor.save(data);
  }
  async updatevendor(id: number, data: Partial<updateVendorDto>) {
    if (!id) {
      throw new BadRequestException('something went wrong');
    }
    return this.vendor.update({ vendorId: id }, data);
  }

  async deleteVendor(id:number){
    return await this.vendor.delete({vendorId:id})
 }
}
