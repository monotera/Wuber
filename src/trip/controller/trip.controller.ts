import {Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {TripDTO} from "../dto/trip.dto";
import {TripService} from "../service/trip.service";
import {BasicTripInitDTO} from "../dto/basicTripInit.dto";
import {BasicTripEndDTO} from "../dto/basicTripEnd.dto";
import {ApiOperation} from "@nestjs/swagger";


@Controller('trips')
export class TripController {
    constructor(private readonly tripService: TripService) {
    }

    @Get()
    findAll(): Promise<TripDTO[]> {
        return this.tripService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Starts a new trip.' })
    async startATrip(@Body() basicTripInfo: BasicTripInitDTO): Promise<TripDTO> {
        try {
            return await this.tripService.startATrip(basicTripInfo)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch("/:id")
    @ApiOperation({ summary: 'Ends a given trip' })
    async finishATrip(@Param('id', ParseIntPipe) id: number, @Body() basicTripEndInfo: BasicTripEndDTO): Promise<TripDTO> {
        basicTripEndInfo.tripId = id;
        try {
            return await this.tripService.finishATrip(basicTripEndInfo);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/:id")
    findOne(@Param('id', ParseIntPipe) id: number): Promise<TripDTO | null> {
        return this.tripService.findOne(id);
    }
}
