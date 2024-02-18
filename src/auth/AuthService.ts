//AuthService.ts

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import  { UserService} from '../components/users/UserService'
import { LoginDTO } from './DTO/LoginDTO';
import * as bcrypt from 'bcrypt';import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService:JwtService,
        //private roleRepository: RoleService,
        ) {}

    async login(loginDTO: LoginDTO): Promise<string | null> {

        const { username, password} = loginDTO;

        const userFound = await this.userService.findOneUsernWithPassword(username);
        if(!userFound) throw new HttpException('Usuario no encontrado: '+ username, HttpStatus.NOT_FOUND);

        const checkPassword = await bcrypt.compare(password, userFound.password);
        if(!checkPassword) throw new HttpException('Credenciales incorrectas', HttpStatus.NOT_FOUND);

        //const payload = {id: userFound.iduser, username: userFound.username, role: userFound.role.idrole};
        const payload = {id: userFound.iduser, username: userFound.username, role: userFound.role};
        const token = this.jwtService.sign(payload);
        
        //const role = await this.roleRepository.findByIdrole(userFound.role.idrole)
        
        const response = {
            iduser: userFound.iduser,
            username: userFound.username,
            email: userFound.email,
            fecha_registro: userFound.fecha_registro,
            role: userFound.role,
            //role,
            profile: userFound.profile
        };

        const data = {response, token};
        return JSON.stringify(data);
    }

    async profile({username, role}: {username:string, role: string}) {
        
    return this.userService.findByUsername(username);
    }


}