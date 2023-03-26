import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Trip} from "../models/trip.entity";
import {TripI} from "../models/trip.interface";

/*TODO:
* startTrip(riderId, long, lat) -> Trip
* endTrip(tripId, long, lat) -> Trip
* calculatePrice(startLocation,endLocation) -> price
*
* */
@Injectable()
export class TripService {
    constructor(
        @InjectRepository(Trip)
        private riderRepository: Repository<Trip>,
    ) {
    }

    findAll(): Promise<TripI[]> {
        return this.riderRepository.find();
    }

    findOne(id: number): Promise<TripI | null> {
        return this.riderRepository.findOneBy({id});
    }
}