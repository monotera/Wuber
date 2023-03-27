import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Invoice} from "../models/invoice.entity";
import {InvoiceDTO} from "../dto/invoice.dto";
import {TripDTO} from "../dto/trip.dto";
import axios from "axios";
import {v4 as uuid} from 'uuid';

const BASE_PRICE = 3500;
const PRICE_EVERY_KM = 1000;
const PRICE_EVERY_MIN = 200;
const WOMPI_SANDBOX_URL = "https://sandbox.wompi.co"

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice)
        private invoiceRepository: Repository<Invoice>
    ) {
    }

    findAll(): Promise<InvoiceDTO[]> {
        return this.invoiceRepository.find();
    }

    findOne(id: number): Promise<InvoiceDTO | null> {
        return this.invoiceRepository.findOneBy({id});
    }

    async buildInvoice(trip: TripDTO): Promise<InvoiceDTO> {
        let totalKm = this.calculateTotalKm(trip.startLong, trip.startLat, trip.endLong, trip.endLat);
        let totalMin = this.calculateTotalMin(trip.startTime, trip.endTime);
        let finalPrice = Math.ceil(this.calculateFinalPrice(totalKm, totalMin))
        return {
            basePrice: BASE_PRICE,
            totalKM: totalKm,
            totalMin: totalMin,
            finalPrice: finalPrice,
            paymentReference: await this.createPaymentTransaction(finalPrice, trip.rider.email, trip.rider.creditCardPaymentSource, trip.rider.acceptanceToken)
        } as InvoiceDTO;
    }

    async create(trip: TripDTO): Promise<InvoiceDTO> {
        let rawInvoice = await this.buildInvoice(trip);
        console.log(rawInvoice)
        let newInvoice = this.invoiceRepository.create(rawInvoice);
        return this.invoiceRepository.save(newInvoice);
    }

    calculateFinalPrice(totalKm: number, totalMinutes: number): number {
        return this.calculatePricePerKm(totalKm) + this.calculatePricePerMinute(totalMinutes);
    }

    calculatePricePerKm(totalKm: number): number {
        return totalKm * PRICE_EVERY_KM;
    }

    calculatePricePerMinute(totalMin: number) {
        return totalMin * PRICE_EVERY_MIN;
    }

    deg2rad(deg: number): number {
        return deg * (Math.PI / 180)
    }

    //This uses the Haversine formula
    calculateTotalKm(startLong: number, startLat: number, endLong: number, endLat: number): number {
        let x = endLong - startLong;
        let y = endLat - startLat;
        return Math.sqrt(x * x + y * y);
    }

    calculateTotalMin(startTime: Date, endTime: Date): number {
        return Math.abs(Math.round(((endTime.getTime() - startTime.getTime()) / 1000) / 60));
    }

    async createPaymentTransaction(amount: number, customerEmail: string, paymentSourceId: number, acceptanceToken: string): Promise<string> {
        let paymentReference = uuid();
        const config = {
            headers: {Authorization: `Bearer ${process.env.PRIVATE_WOMPI_SANDBOX_KEY}`}
        };
        await axios.post(WOMPI_SANDBOX_URL + "/v1/transactions", {
            acceptance_token: acceptanceToken,
            amount_in_cents: amount * 100,
            currency: "COP",
            customer_email: customerEmail,
            payment_method: {
                "installments": 1
            },
            type: "CARD",
            reference: paymentReference, // Referencia única de pago
            payment_source_id: paymentSourceId // ID de la fuente de pago
        }, config)
        return paymentReference;
    }
}