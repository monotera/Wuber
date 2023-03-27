import {DriversService} from "../service/drivers.service";
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {DriverDTO} from "../dto/driver.dto";

@Controller('drivers')
export class DriverController {
    constructor(private readonly driverService: DriversService) {
    }

    @Get()
    findAll(): Promise<DriverDTO[]> {
        return this.driverService.findAll();
    }

    @Post()
    create(@Body() driver: DriverDTO): Promise<DriverDTO> {
        return this.driverService.create(driver);
    }

    @Get("/available")
    findAvailableDrivers(): Promise<DriverDTO[]>{
        return this.driverService.fetchAllAvailableDrivers();
    }

    @Get("/:id")
    findOne(@Param('id') id: number): Promise<DriverDTO | null> {
        return this.driverService.findOne(id);
    }

}
