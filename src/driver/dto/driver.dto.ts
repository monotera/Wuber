import {IsNotEmpty} from 'class-validator';

export class DriverDTO {
    id: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    licensePlate: string;
    @IsNotEmpty()
    currentLat: number;
    @IsNotEmpty()
    currentLong: number;
    isAvailable: boolean;
}