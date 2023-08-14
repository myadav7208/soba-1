import { Body, Controller, Post,Get, Param ,Request,UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { userDto } from "src/dtos/user/user.dto";
import { jwtAuth } from "src/auth/jwtAuth.guard";
 
 
@Controller('/user')

export class userController{
    constructor(
          private userService:userService
        
    ){}

 
  @Get(':id' )
   async getUser(@Param('id') id:number  ){
           return this.userService.findById(id)
   }
   
}