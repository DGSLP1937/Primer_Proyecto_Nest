//AuthController.ts

import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './AuthService';
import { LoginDTO } from './DTO/LoginDTO';

import { Request } from 'express';
import { AuthGuard } from './guard/AuthGuard';
import { RolesGuard } from './guard/RolesGuard';
import { Role } from '../common/enum/Rol.enum';
import { Auth } from './decorators/AuthDecorator';
import { ActiveUser } from 'src/common/decorator/ActiveUserDecorator';
import { UserActiveInterface } from 'src/common/interface/UserActiveInterface';


interface RequestWithUser extends Request {
  user: {
    username: string;
    role: string;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
      return this.authService.login(loginDTO);
  }
  
  @Get('profile')
  @Auth(Role.ADMIN)
  profile(@ActiveUser() user: UserActiveInterface){
    return this.authService.profile(user)
  }

}
