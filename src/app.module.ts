import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DriverModule} from './driver/driver.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RiderModule} from "./rider/rider.module";
import {TripModule} from "./trip/trip.module";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: "postgres://tester:tester@postgres:5432/wuber",
            port: 5432,
            autoLoadEntities: true,
            synchronize: true,
        }), DriverModule, RiderModule, TripModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
