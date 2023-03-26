import { Module } from '@nestjs/common';
import {TripService} from "./service/trip.service";
import {TripController} from "./controller/trip.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Trip} from "./models/trip.entity";
import {Invoice} from "./models/invoice.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Trip, Invoice])],
    controllers: [TripController],
    providers: [TripService],
})
export class TripModule {}
