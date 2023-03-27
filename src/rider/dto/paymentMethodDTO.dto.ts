import {IsNotEmpty} from 'class-validator';

export class PaymentMethodDTO {
    riderId: number;

    @IsNotEmpty()
    tokenizeCard: string;
    @IsNotEmpty()
    acceptance_token: string;
}
