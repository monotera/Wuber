export interface InvoiceI {
    id: number;
    basePrice: number;
    finalPrice: number;
    totalKM: number;
    paymentReference: string;
}