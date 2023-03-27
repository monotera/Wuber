import {DriversService} from "../service/drivers.service";
import {Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post} from '@nestjs/common';
import {DriverDTO} from "../dto/driver.dto";
import {ApiOperation} from "@nestjs/swagger";

@Controller('drivers')
export class DriverController {
    constructor(private readonly driverService: DriversService) {
    }

    @Get()
    findAll(): Promise<DriverDTO[]> {
        return this.driverService.findAll();
    }

    @Get("/available")
    @ApiOperation({summary: 'Finds all drivers that are ready for a trip.'})
    findAvailableDrivers(): Promise<DriverDTO[]> {
        return this.driverService.fetchAllAvailableDrivers();
    }

    @Get("/:id")
    findOne(@Param('id', ParseIntPipe) id: number): Promise<DriverDTO | null> {
        return this.driverService.findOne(id);
    }

    @Post("/populate")
    @ApiOperation({summary: 'Creates mock data'})
    async populateDB(): Promise<DriverDTO[]> {
        try {
            return await this.driverService.populateDB();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
