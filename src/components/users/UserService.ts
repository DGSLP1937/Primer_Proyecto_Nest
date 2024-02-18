//UserService.ts

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from "typeorm";
import { UpdateUserDTO } from "./DTO/UpdateUserDTO";
import { CreateUserDTO } from "./DTO/CreateUserDTO";
import { UserEntity } from "../../entities/User.entity";
import * as bcrypt from 'bcrypt';
import { RoleEntity } from "../../entities/Role.entity";

@Injectable()

export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        ){}
    
    async findByUsername(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { username }, relations:['profile'] });
    }

    async findOneUsernWithPassword(username: string){
        return this.userRepository.findOne({
             where: { username },
            select:['iduser', 'username','password', 'email', 'fecha_registro', 'role', 'profile'], 
            relations:['profile'] });
    }

    async getAllUsers(): Promise <UserEntity[]>{
        return await this.userRepository.find({relations: ['profile']});
    }

    async createUser(user: CreateUserDTO) {
        const userFound = await this.userRepository.findOne({
            where: [
                {username: user.username},
            ],
            relations: ['role']
        })

        if(userFound) {
            return new HttpException('User existente: ' + user.username, HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepository.create({
            username: user.username,
            email: user.email
        } as DeepPartial<UserEntity>);
        newUser.password = hashedPassword;
        /*
        const newUser = this.userRepository.create({
            ...user,
            password: hashedPassword,
            role: { idrole: user.role },
        } as DeepPartial<UserEntity>);
        */
        const userCreated = await this.userRepository.save(newUser);

        const roleFound = await this.roleRepository.findOne({
            where: {
                //idrole: userCreated.role.idrole
                //idrole: userCreated.role.idrole
            }
        })

        const response = {
            iduser: userCreated.iduser,
            username: userCreated.username,
            email: userCreated.email,
            fecha_registro: userCreated.fecha_registro,
            //roleFound,
            role: userCreated.role,
            profile: userCreated.profile
        };
        return response;
    }

    async getSelectedUser (iduser: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                iduser
            },
            relations:['profile'],
        })

        if(!userFound) {
            return new HttpException('No se encontro el User: ' + iduser, HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async updateUser(iduser: number, user: UpdateUserDTO) {
        const userFound =  await this.userRepository.findOne({
            where: {
                iduser
            }
        })

        if(!userFound) {
            return new HttpException('No se encontro el User a actualizar', HttpStatus.NOT_FOUND);
        }

        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            userFound.password = hashedPassword;
        }

        const updateUser = Object.assign(userFound, user)
        return this.userRepository.save(updateUser)
    }
    
    async deleteUser(iduser: number) {
        
        const result = await this.userRepository.delete({iduser})

        if(result.affected === 0) {
            return new HttpException('No se encontro el User', HttpStatus.NOT_FOUND);
        }
        return result;
    }
    
}