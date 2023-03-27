import {IsNotEmpty, IsEmail} from 'class-validator';

export class RiderDTO {
    id: number;
    @IsNotEmpty()
    name: string;
    creditCardPaymentSource: number;
    acceptanceToken: string;
    @IsEmail()
    email: string;
    isAvailable: boolean
}
