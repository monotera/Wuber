import {RiderService} from "../service/rider.service";
import {Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {RiderDTO} from "../dto/rider.dto";
import {PaymentMethodDTO} from "../dto/paymentMethodDTO.dto";
import {ApiOperation} from "@nestjs/swagger";


@Controller('riders')
export class RiderController {
    constructor(private readonly riderService: RiderService) {
    }

    @Get()
    findAll(): Promise<RiderDTO[]> {
        return this.riderService.findAll();
    }

    @Get("/:id")
    findOne(@Param('id', ParseIntPipe) id: number): Promise<RiderDTO | null> {
        return this.riderService.findOne(id);
    }

    @Patch("/:id")
    @ApiOperation({ summary: 'Creates customer payment source in wompi.' })
    async createPaymentMethod(@Param('id', ParseIntPipe) id: number, @Body() paymentMethodDTO: PaymentMethodDTO): Promise<RiderDTO> {
        paymentMethodDTO.riderId = id;
        try {
            return this.riderService.createPaymentMethod(paymentMethodDTO);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post("/populate")
    @ApiOperation({ summary: 'Creates mock data' })
    async populateDB(@Body() mockData: any): Promise<RiderDTO[]> {
        try {
            return await this.riderService.populateDB(this.isMockArrayValid(mockData.creditCardPaymentSources), this.isMockArrayValid(mockData.acceptanceTokens));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    isMockArrayValid(array: []) {
        return typeof array !== 'undefined' && array.length > 0 ? array : []
    }
}
