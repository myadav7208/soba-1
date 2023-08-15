import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { updateClientDto } from 'src/dtos/client/update.dto';

import { Client } from 'src/entity/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class clientServices {
  constructor(
    @InjectRepository(Client)
    private readonly client: Repository<Client>,
  ) { }
  async getOneClient(id: number) {
    return  await this.client.findOne({
      where: {
        clientId: id,
        
      },relations:["companies"]
    });
   
  }
  async getALLClient(): Promise<Client[]> {
    const allCleint = await this.client.find();
    return allCleint;
  }
  async createClient(data) {
    return await this.client.save(data);
  }
  async updateClient(id: number, data: Partial<updateClientDto>) {
    if (!id) {
      throw new BadRequestException('something went wrong');
    }
    return this.client.update({ clientId: id }, data);
  }

  async deleteclient(id:number){
    return await this.client.delete({clientId:id})
 }
    
    async getCompanyClients(id:number){
      return await this.client.find({where:{companyId:id}})
   
    
    }
}
