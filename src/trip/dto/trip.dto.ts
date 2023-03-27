import {Rider} from "../../rider/models/rider.entity";
import {Driver} from "../../driver/models/driver.entity";
import {Invoice} from "../models/invoice.entity";
import {IsNumber} from "class-validator";

export class TripDTO {
    id: number;
    startTime: Date;
    endTime: Date;
    @IsNumber()
    startLat: number;
    @IsNumber()
    startLong: number;
    @IsNumber()
    endLat: number;
    @IsNumber()
    endLong: number;

    driver: Driver;

    rider: Rider;

    invoice: Invoice;
}