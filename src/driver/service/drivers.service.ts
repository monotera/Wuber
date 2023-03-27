import {Injectable} from '@nestjs/common';
import {Driver} from "../models/driver.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {DriverDTO} from "../dto/driver.dto";

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

    findAll(): Promise<DriverDTO[]> {
        return this.driverRepository.find();
    }

    findOne(id: number): Promise<DriverDTO | null> {
        return this.driverRepository.findOneBy({id});
    }

    create(driver: DriverDTO): Promise<DriverDTO> {
        const newDriver = this.driverRepository.create(driver);
        return this.driverRepository.save(newDriver);

    }

    fetchAllAvailableDrivers(): Promise<DriverDTO[]> {
        return this.driverRepository.find({
            where: {
                isAvailable: true
            }
        });
    }

    async fetchAvailableDriverId(): Promise<number> {
        let availableDriver = await this.fetchAllAvailableDrivers();
        if (availableDriver.length <= 0)
            throw new Error("there are no available drivers.");
        return availableDriver[0]["id"];
    }

    async updateAvailability(id: number, availability:boolean): Promise<UpdateResult> {
        return this.driverRepository.update(id, {isAvailable: availability});
    }
}
