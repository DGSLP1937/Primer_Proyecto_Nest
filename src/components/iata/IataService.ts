//IataService.ts

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateIataDTO } from "./DTO/CreateIataDTO";
import { UpdateIataDTO } from "./DTO/UpdateIataDTO";
import { IataEntity } from "../../entities/Iata.entity";

@Injectable()

export class IataService {

    constructor(
        @InjectRepository(IataEntity)
        private readonly iataRepository: Repository<IataEntity>,
    ){}
    
    getAllIatas() {
        return this.iataRepository.find();
    }

    async createIata(iata: CreateIataDTO) {
        const iataFound = await this.iataRepository.findOne({
            where: {
                cod_iat: iata.cod_iat
            }
        })

        if(iataFound) {
            return new HttpException('Codigo IATA existente '+iata.cod_iat, HttpStatus.CONFLICT);
        }
        const newIata = this.iataRepository.create(iata);
        return this.iataRepository.save(newIata);
    }

    async getSelectedIata(idiata: number) {
        const iataFound = await this.iataRepository.findOne({
            where: {
                idiata
            }
        })

        if(!iataFound) {
            return new HttpException('No se encontro la Iata', HttpStatus.NOT_FOUND);
        }

        return iataFound;
    }
    
    async updateIata(idiata: number, iata: UpdateIataDTO) {
        const iataFound =  await this.iataRepository.findOne({
            where: {
                idiata
            }
        })

        if(!iataFound) {
            return new HttpException('No se encontro la Iata a actualizar', HttpStatus.NOT_FOUND);
        }
        const updateIata = Object.assign(iataFound, iata)
        return this.iataRepository.save(updateIata)
    }

    async deleteIata(idiata: number) {
        
        const result = await this.iataRepository.delete({idiata})

        if(result.affected === 0) {
            return new HttpException('No se encontro la Iata', HttpStatus.NOT_FOUND);
        }

        return result;
    } 

}