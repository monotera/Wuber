import {Trip} from "../../trip/models/trip.entity";

export interface DriverI {
    id: number;
    name: string;
    licensePlate: string;
    currentLat: number;
    currentLong: number;
    isAvailable: boolean;
    trips: Trip[];
}