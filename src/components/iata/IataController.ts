//IataControll.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { IataService } from "./IataService";
import { CreateIataDTO } from "./DTO/CreateIataDTO";
import { UpdateIataDTO } from "./DTO/UpdateIataDTO";
import { IataEntity } from "../../entities/Iata.entity";

import { Auth } from "../../auth/decorators/AuthDecorator";
import { Role } from "../../common/enum/Rol.enum";


@Auth(Role.ADMIN)
@Controller('iata')

export class IataController {
    constructor (private readonly iataService: IataService){}

    @Get()
    getAllIatas(): Promise<IataEntity[]> {
        return this.iataService.getAllIatas();
    }

    @Post()
    createIata(@Body() newIata: CreateIataDTO ){
        return this.iataService.createIata(newIata);
    }

    @Get(':id')
    getSelectedIata(@Param('id', ParseIntPipe) idiata:number ) {
        return this.iataService.getSelectedIata(idiata);
    }

    @Put(':id')
    updateIata(@Param('id', ParseIntPipe) idiata: number, @Body()iata: UpdateIataDTO) {
        return this.iataService.updateIata(idiata, iata)
    }

    @Delete(':id')
    deleteIata(@Param('id', ParseIntPipe) idiata: number) {
        return this.iataService.deleteIata(idiata);
    }


    /*
    @Get('/list_iata')
    async getAll(): Promise<IataEntity[]> {
        return await this.iataService.getAll();
    }
    */
}