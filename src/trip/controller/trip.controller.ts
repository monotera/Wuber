import {Controller, Get, Param} from '@nestjs/common';
import {TripI} from "../models/trip.interface";
import {TripService} from "../service/trip.service";

/*
* /trips -> GET, POST
* /trips/:id GET, POST, PUT
* /trips/:id GET, POST, PUT
* */
@Controller('trips')
export class TripController {
    constructor(private readonly tripService: TripService) {
    }

    @Get()
    findAll(): Promise<TripI[]> {
        return this.tripService.findAll();
    }

    @Get("/:id")
    findOne(@Param('id') id: number): Promise<TripI | null> {
        return this.tripService.findOne(id);
    }
}
