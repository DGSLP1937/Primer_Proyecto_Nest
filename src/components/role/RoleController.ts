//RoleController.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { RoleService } from "./RoleService";
import { RoleEntity } from "../../entities/Role.entity";

@Controller('role')

export class RoleController {

  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  getSelectedRole(@Param('id', ParseIntPipe) idrole: number ) {
    return this.roleService.findByIdrole(idrole);
  }

}
