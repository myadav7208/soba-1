import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

 import { updateProductDto } from 'src/dtos/product/update.dto';

import { product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class productServices {
  constructor(
    @InjectRepository(product)
    private readonly product: Repository<product>,
  ) {}
  async getOneProduct(id: number) {
    const product = await this.product.findOne({
       where:{
        productId:id
       },relations:['company']
    });
    if (!product) {
      throw new NotFoundException('product does not exist');
    }
    return product;
  }
  async getALLProduct(): Promise<product[]> {
    const allproduct = await this.product.find();

    if (!allproduct.length) {
      throw new NotFoundException('no product found');
    }
    return allproduct;
  }
  async createProduct(data) {
    return await this.product.save(data);
  }
  async updateProduct(id: number, data:Partial<updateProductDto>  ) {
    if (!id) {
      throw new BadRequestException('something went wrong');
    }
    return this.product.update({ productId: id }, data);
  }

  async deleteProduct(id:number){
    return await this.product.delete({productId:id})
 }
 
 async getCompanyProducts(id:number){
  return await this.product.find({where:{companyId:id}})


}
}
