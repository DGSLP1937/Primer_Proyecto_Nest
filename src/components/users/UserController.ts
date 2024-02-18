//UserController.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { UserService } from './UserService';
import { UserEntity } from "../../entities/User.entity";
import { CreateUserDTO } from "./DTO/CreateUserDTO";
import { UpdateUserDTO } from "./DTO/UpdateUserDTO";

import { CreateProfileDTO } from "../profile/DTO/CreateProfileDTO";

@Controller('user')

export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() newUser: CreateUserDTO){
      return this.userService.createUser(newUser);
  }

  @Get(':id')
  getSelectedUser(@Param('id', ParseIntPipe) iduser: number ) {
    return this.userService.getSelectedUser(iduser);
  }
  
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) iduser: number, @Body() user: UpdateUserDTO) {
    return this.userService.updateUser(iduser, user)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) idiata: number) {
      return this.userService.deleteUser(idiata);
  }

  /*
  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id:number,
    @Body() profile: CreateProfileDTO
  ){
    return this.userService.createProfile(id,profile);
  }
  */

}
