import {IsNumber} from 'class-validator';

export class InvoiceDTO {
    id: number;
    @IsNumber()
    basePrice: number;
    @IsNumber()
    finalPrice: number;
    @IsNumber()
    totalKM: number;
    @IsNumber()
    totalMin: number;
    paymentReference: string;
}