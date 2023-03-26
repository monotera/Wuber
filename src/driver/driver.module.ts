import {Module} from '@nestjs/common';
import {DriversService} from './service/drivers.service';
import {Driver} from "./models/driver.entity";
import {DriverController} from "./controller/driver.controller";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Driver])],
    controllers: [DriverController],
    providers: [DriversService],
})
export class DriverModule {
}
