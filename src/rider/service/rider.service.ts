import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RiderI} from "../models/rider.interface";
import {Rider} from "../models/rider.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RiderService {
    constructor(
        @InjectRepository(Rider)
        private riderRepository: Repository<Rider>,
    ) {
    }

    findAll(): Promise<RiderI[]> {
        return this.riderRepository.find();
    }

    findOne(id: number): Promise<RiderI | null> {
        return this.riderRepository.findOneBy({id});
    }

    create(rider: RiderI): Promise<RiderI> {
        const newRider = this.riderRepository.create(rider);
        return this.riderRepository.save(newRider);
    }
}