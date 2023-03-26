import {RiderService} from "../service/rider.service";
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RiderI} from "../models/rider.interface";


@Controller('riders')
export class RiderController {
    constructor(private readonly riderService: RiderService) {
    }

    @Get()
    findAll(): Promise<RiderI[]> {
        return this.riderService.findAll();
    }

    @Post()
    create(@Body() rider: RiderI): Promise<RiderI> {
        return this.riderService.create(rider);
    }

    @Get("/:id")
    findOne(@Param('id') id: number): Promise<RiderI | null> {
        return this.riderService.findOne(id);
    }
}
