//RoleService.ts


import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from "../../entities/Role.entity";
import { Repository } from "typeorm";

@Injectable()

export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        ){}
    
    async findByIdrole(idrole: number): Promise<RoleEntity | undefined> {
        return this.roleRepository.findOne({ where: { idrole }});
    }
    async getAllRoles(): Promise <RoleEntity[]>{
        return await this.roleRepository.find();
    }
    
}