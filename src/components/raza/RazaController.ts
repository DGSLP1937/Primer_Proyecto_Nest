//RazaController.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { RazaService } from "./RazaService";
import { CreateRazaDTO } from "./DTO/CreateRazaDTO";

@Controller('raza')

export class RazaController {

    constructor(private readonly razaService: RazaService) {}

    @Post()
    createRaza(@Body() newRaza: CreateRazaDTO){
        return this.razaService.createRaza(newRaza);
    }
}
