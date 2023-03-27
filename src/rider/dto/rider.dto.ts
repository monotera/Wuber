import {Trip} from "../../trip/models/trip.entity";
import {IsNotEmpty, IsEmail, IsNumber} from 'class-validator';

export class RiderDTO {
    id: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()

    creditCardPaymentSource: number;
    @IsNotEmpty()
    @IsNumber()
    acceptanceToken: string;
    @IsEmail()
    email: string;
    isAvailable: boolean
    trips: Trip[];
}
