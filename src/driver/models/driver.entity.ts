import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Trip} from "../../trip/models/trip.entity";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column()
    licensePlate: string;

    @Column("decimal", { precision: 17, scale: 15 })
    currentLat: number;

    @Column("decimal", { precision: 17, scale: 15 })
    currentLong: number;

    @Column({default: true})
    isAvailable: boolean;

    @OneToMany(() => Trip, trip => trip.driver)
    trips: Trip[];
}
