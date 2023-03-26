import {Module} from '@nestjs/common';
import { RiderController } from './controller/rider.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rider} from "./models/rider.entity";
import {RiderService} from "./service/rider.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rider])],
    providers: [RiderService],
    controllers: [RiderController]
})
export class RiderModule {
}
