//UserModule.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './UserController';
import { UserService } from './UserService';
import { UserEntity } from '../../entities/User.entity';
import { RoleEntity } from '../../entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]),],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
