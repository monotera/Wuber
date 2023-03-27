import {RiderService} from "../service/rider.service";
import {Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {RiderDTO} from "../dto/rider.dto";
import {PaymentMethodDTO} from "../dto/paymentMethodDTO.dto";


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
    findOne(@Param('id', ParseIntPipe) id: number): Promise<RiderDTO | null> {
        return this.riderService.findOne(id);
    }

    @Patch("/:id")
    async finishATrip(@Param('id', ParseIntPipe) id: number, @Body() paymentMethodDTO: PaymentMethodDTO): Promise<RiderDTO> {
        paymentMethodDTO.riderId = id;
        try {
            return this.riderService.createPaymentMethod(paymentMethodDTO);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
