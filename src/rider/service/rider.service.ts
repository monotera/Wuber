import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {Rider} from "../models/rider.entity";
import {Injectable} from "@nestjs/common";
import {PaymentMethodDTO} from "../dto/paymentMethodDTO.dto";
import axios from "axios";
import {RiderDTO} from "../dto/rider.dto";

const WOMPI_SANDBOX_URL = "https://sandbox.wompi.co"


@Injectable()
export class RiderService {
    constructor(
        @InjectRepository(Rider)
        private riderRepository: Repository<Rider>,
    ) {
    }

    findAll(): Promise<RiderDTO[]> {
        return this.riderRepository.find();
    }

    findOne(id: number): Promise<RiderDTO | null> {
        return this.riderRepository.findOneBy({id});
    }

    create(rider: RiderDTO): Promise<RiderDTO> {
        const newRider = this.riderRepository.create(rider);
        return this.riderRepository.save(newRider);
    }

    async isRiderAvailable(id: number): Promise<void> {
        const rider = await this.riderRepository.findOne({
            where: {
                isAvailable: true,
                id: id
            }
        });
        if (!rider)
            throw new Error("The given rider is not available.");
        if (!rider.creditCardPaymentSource)
            throw new Error("The given rider hasn't created a paymentSource.");
        if (!rider.acceptanceToken)
            throw new Error("The given rider hasn't agreed to the politics of the page.");
    }

    async updateAvailability(id: number, availability: boolean): Promise<UpdateResult> {
        return this.riderRepository.update(id, {isAvailable: availability});
    }

    async createPaymentMethod(paymentMethodDTO: PaymentMethodDTO): Promise<RiderDTO> {
        let rider = await this.findOne(paymentMethodDTO.riderId);
        if (!rider)
            throw new Error("The given rider id is invalid.");

        const config = {
            headers: {Authorization: `Bearer ${process.env.PRIVATE_WOMPI_SANDBOX_KEY}`}
        };
        let {data} = await axios.post(WOMPI_SANDBOX_URL + "/v1/payment_sources", {
            type: "CARD",
            token: paymentMethodDTO.tokenizeCard,
            customer_email: rider.email,
            acceptance_token: paymentMethodDTO.acceptance_token
        }, config)
        console.log(data)
        console.log(data.data.id)
        rider.acceptanceToken = paymentMethodDTO.acceptance_token;
        rider.creditCardPaymentSource = data.data.id;
        return this.riderRepository.save(rider);
    }


}