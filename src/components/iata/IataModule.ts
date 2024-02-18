//IataModule.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IataController } from "./IataController";
import { IataService } from "./IataService";
import { IataEntity } from "../../entities/Iata.entity";

@Module({
    imports: [TypeOrmModule.forFeature([IataEntity])],
    controllers: [IataController],
    providers: [IataService],
    exports: [IataService],
})
export class IataModule {}
