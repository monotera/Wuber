import {IsNotEmpty, IsNumber} from 'class-validator';

export class BasicTripEndDTO {
    @IsNumber()
    tripId: number;
    @IsNumber()
    @IsNotEmpty()
    tripEndLat: number;
    @IsNumber()
    @IsNotEmpty()
    tripEndLong: number;
}