//RoleModule.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './RoleService';
import { RoleController } from './RoleController';
import { RoleEntity } from '../../entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]),],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
