import {Injectable} from '@nestjs/common';
import {Driver} from "../models/driver.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DriverI} from "../models/driver.interface";

/*
* TODO: Methods
*  getAvailableDrivers() -> List of drivers
*  updateDriverAvailability(DriverId, status) -> void
*  getDriver(DriverId) -> Driver
* */
@Injectable()
export class DriversService {
    constructor(
        @InjectRepository(Driver)
        private driverRepository: Repository<Driver>,
    ) {
    }
    findAll(): Promise<DriverI[]> {
        return this.driverRepository.find();
    }

    findOne(id: number): Promise<DriverI | null> {
        return this.driverRepository.findOneBy({id});
    }

    create(driver: DriverI): Promise<DriverI> {
        const newDriver = this.driverRepository.create(driver);
        return this.driverRepository.save(newDriver);

    }
}
