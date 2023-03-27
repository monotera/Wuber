import {IsNotEmpty, IsEmail} from 'class-validator';

export class RiderDTO {
    id: number;
    @IsNotEmpty()
    name: string;
    creditCardPaymentSource: number | undefined;
    acceptanceToken: string | undefined;
    @IsEmail()
    email: string;
    isAvailable: boolean
}
