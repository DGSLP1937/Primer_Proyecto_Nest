//Iata.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'iata'})

export class IataEntity {

    @PrimaryGeneratedColumn()
    idiata: number;

    @Column()
    pais_iat: string;

    @Column()
    ciudad_iat: string;

    @Column()
    aeropuerto_iat: string;

    @Column({unique: true})
    cod_iat: string;

    @Column()
    ubigeo_iat: string;
}