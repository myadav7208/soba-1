
import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository}  from '@nestjs/typeorm'
 
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

 interface userData{
 
    firstName:string,
    lastName?:string,
    username:string,
    password:string
 }
@Injectable()


export class userService{
    constructor(
        @InjectRepository(User)
        private users:Repository<User>
    ){}


    async createUser(user:userData){
        return   await this.users.save(user)
         
          
    }
    async findById(id:number){
        const user= await this.users.find({
            where:{
                id
            }
        }) 
         if(!user){
           return   new NotFoundException('user does not exit') 
         }
          return user
    }
    async findUser(username:string){
        const user=await this.users.findOne({
            where:{
                username
            }
        })

        return user
    }
}