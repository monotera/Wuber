import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Trip} from "../models/trip.entity";
import {TripDTO} from "../dto/trip.dto";
import {DriversService} from "../../driver/service/drivers.service";
import {Driver} from "../../driver/models/driver.entity";
import {Rider} from "../../rider/models/rider.entity";
import {BasicTripInitDTO} from "../dto/basicTripInit.dto";
import {RiderService} from "../../rider/service/rider.service";
import {BasicTripEndDTO} from "../dto/basicTripEnd.dto";
import {InvoiceService} from "./invoice.service";

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
        private tripRepository: Repository<Trip>,
        private readonly driverService: DriversService,
        private readonly riderService: RiderService,
        private readonly invoiceService: InvoiceService
    ) {
    }

    findAll(): Promise<TripDTO[]> {
        return this.tripRepository.find({
            relations: ['driver', 'rider', 'invoice']
        });
    }

    findOne(id: number): Promise<TripDTO | null> {
        return this.tripRepository.findOne({
            relations: ['driver', 'rider', 'invoice'],
            where: {id: id},
        });
    }

    create(trip: TripDTO): Promise<TripDTO> {
        const newTrip = this.tripRepository.create(trip);
        return this.tripRepository.save(newTrip);
    }

    async startATrip(basicTripStartInfo: BasicTripInitDTO): Promise<TripDTO> {
        await this.riderService.isRiderAvailable(basicTripStartInfo.riderId);
        let driver = new Driver();
        driver.id = await this.driverService.fetchAvailableDriverId();
        let rider = new Rider();
        rider.id = basicTripStartInfo.riderId;
        let newTrip = {
            startTime: new Date(),
            startLat: basicTripStartInfo.riderCurrentLat,
            startLong: basicTripStartInfo.riderCurrentLong,
            driver: driver,
            rider: rider
        } as TripDTO;
        await this.driverService.updateAvailability(driver.id, false);
        await this.riderService.updateAvailability(rider.id, false);
        return this.create(newTrip)
    }

    async finishATrip(basicTripEndInfo: BasicTripEndDTO): Promise<TripDTO> {
        let trip: TripDTO | null = await this.findOne(basicTripEndInfo.tripId);
        if (!trip)
            throw new Error("Invalid trip id")
        trip.endTime = new Date();
        trip.endLat = basicTripEndInfo.tripEndLat;
        trip.endLong = basicTripEndInfo.tripEndLong;
        trip.invoice = await this.invoiceService.create(trip);
        await this.driverService.updateAvailability(trip.driver.id, true);
        await this.riderService.updateAvailability(trip.driver.id, true);
        return this.tripRepository.save(trip);
    }
}