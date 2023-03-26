import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Driver} from "../../driver/models/driver.entity";
import {Rider} from "../../rider/models/rider.entity";
import {Invoice} from "./invoice.entity";


@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'timestamptz'})
    startTime: Date
    @Column({type: 'timestamptz', nullable: true})
    endTime: Date
    @Column("decimal", { precision: 17, scale: 15 })
    startLat: number;
    @Column("decimal", { precision: 17, scale: 15 })
    startLong: number;
    @Column({type: "decimal", precision: 17, scale: 15, nullable: true})
    endLat: number;
    @Column({type: "decimal", precision: 17, scale: 15, nullable: true})
    endLong: number;

    @ManyToOne(() => Driver, (driver) => driver.trips)
    driver: Driver;

    @ManyToOne(() => Rider, (rider) => rider.trips)
    rider: Rider;

    @OneToOne(() => Invoice)
    @JoinColumn()
    invoice: Invoice;
}