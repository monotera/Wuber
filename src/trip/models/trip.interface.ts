import {Rider} from "../../rider/models/rider.entity";
import {Driver} from "../../driver/models/driver.entity";

export interface TripI {
    id: number;
    startTime: Date
    endTime: Date
    startLat: number;
    startLong: number;
    endLat: number;
    endLong: number;

    driver: Driver;

    rider: Rider;
}