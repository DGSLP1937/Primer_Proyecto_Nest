//Rol.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user_role'})
export class RoleEntity {
    @PrimaryGeneratedColumn()
    idrole: number

    @Column()
    role: string
}