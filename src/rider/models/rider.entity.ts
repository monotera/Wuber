import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Trip} from "../../trip/models/trip.entity";


@Entity()
export class Rider {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("decimal", { precision: 17, scale: 15 })
    currentLat: number;
    @Column("decimal", { precision: 17, scale: 15 })
    currentLong: number;
    @Column()
    creditCardToken: string;
    @Column({default: true})
    isOnTrip: boolean

    @OneToMany(() => Trip, trip => trip.rider)
    trips: Trip[];
}