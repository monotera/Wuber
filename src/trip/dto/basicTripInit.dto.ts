import {IsNotEmpty, IsNumber} from 'class-validator';

export class BasicTripInitDTO {
    @IsNotEmpty()
    @IsNumber()
    riderId: number;
    @IsNotEmpty()
    @IsNumber()
    riderCurrentLat: number;
    @IsNotEmpty()
    @IsNumber()
    riderCurrentLong: number;

}