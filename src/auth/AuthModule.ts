import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { UserModule } from '../components/users/UserModule';
import { jwtConstant } from './ConstantJWT';
import { RoleModule } from '../components/role/RoleModule';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
