import {RiderService} from "../service/rider.service";
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RiderDTO} from "../dto/rider.dto";


@Controller('riders')
export class RiderController {
    constructor(private readonly riderService: RiderService) {
    }

    @Get()
    findAll(): Promise<RiderDTO[]> {
        return this.riderService.findAll();
    }

    @Post()
    create(@Body() rider: RiderDTO): Promise<RiderDTO> {
        return this.riderService.create(rider);
    }

    @Get("/:id")
    findOne(@Param('id') id: number): Promise<RiderDTO | null> {
        return this.riderService.findOne(id);
    }
}
