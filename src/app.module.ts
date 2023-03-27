import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DriverModule} from './driver/driver.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RiderModule} from "./rider/rider.module";
import {TripModule} from "./trip/trip.module";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.POSTGRES_URL,
            port: 5432,
            autoLoadEntities: true,
            synchronize: true,
        }), DriverModule, RiderModule, TripModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
