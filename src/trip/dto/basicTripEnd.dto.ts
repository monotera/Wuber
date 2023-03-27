import {IsNotEmpty, IsNumber} from 'class-validator';

export class BasicTripEndDTO {
    tripId: number;
    @IsNumber()
    @IsNotEmpty()
    tripEndLat: number;
    @IsNumber()
    @IsNotEmpty()
    tripEndLong: number;
}