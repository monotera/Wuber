import {Trip} from "../../trip/models/trip.entity";

export interface RiderI {
    id: number;
    name: string;
    currentLat: number;
    currentLong: number;
    creditCardToken: string;
    trips: Trip[];
}
