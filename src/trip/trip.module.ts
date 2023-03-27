import { Module } from '@nestjs/common';
import {TripService} from "./service/trip.service";
import {TripController} from "./controller/trip.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Trip} from "./models/trip.entity";
import {Invoice} from "./models/invoice.entity";
import {DriverModule} from "../driver/driver.module";
import {RiderModule} from "../rider/rider.module";
import {InvoiceService} from "./service/invoice.service";

@Module({
    imports: [TypeOrmModule.forFeature([Trip, Invoice]), DriverModule, RiderModule],
    controllers: [TripController],
    providers: [TripService, InvoiceService],
})
export class TripModule {}
