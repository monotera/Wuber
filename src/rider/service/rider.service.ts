import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {RiderDTO} from "../dto/rider.dto";
import {Rider} from "../models/rider.entity";
import {Injectable} from "@nestjs/common";

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
}