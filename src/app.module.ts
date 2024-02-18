import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './components/users/UserModule';
import { UserEntity } from './entities/User.entity';
import { ProfileEntity } from './entities/Profile.entity';
import { IataEntity } from './entities/Iata.entity';
import { ProfileModule } from './components/profile/ProfileModule';
import { IataModule } from './components/iata/IataModule';
import { AuthModule } from './auth/AuthModule';
import { RoleEntity } from './entities/Role.entity';
import { RoleModule } from './components/role/RoleModule';
import { GatoEntity } from './entities/Gato.entity';
import { GatoModule } from './components/gatos/GatoModule';
import { RazaEntity } from './entities/Raza.entity';
import { RazaModule } from './components/raza/RazaModule';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database:'nestdb',
      entities: [
        UserEntity,
        ProfileEntity,
        IataEntity,
        RoleEntity,
        GatoEntity,
        RazaEntity,
      ],
      synchronize:true,
  }),
  UserModule,
  ProfileModule,
  IataModule,
  AuthModule,
  RoleModule,
  GatoModule,
  RazaModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
