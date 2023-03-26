import {DriversService} from "../service/drivers.service";
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {DriverI} from "../models/driver.interface";

@Controller('drivers')
export class DriverController {
    constructor(private readonly driverService: DriversService) {
    }

    @Get()
    findAll(): Promise<DriverI[]> {
        return this.driverService.findAll();
    }

    @Post()
    create(@Body() driver: DriverI): Promise<DriverI> {
        return this.driverService.create(driver);
    }

    @Get("/:id")
    findOne(@Param('id') id: number): Promise<DriverI | null> {
        return this.driverService.findOne(id);
    }
}
