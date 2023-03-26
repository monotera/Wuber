import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("decimal", { precision: 12, scale: 2 })
    basePrice: number;
    @Column("decimal", { precision: 12, scale: 2 })
    finalPrice: number;
    @Column("decimal", { precision: 4, scale: 2 })
    totalKM: number;
    @Column()
    paymentReference: string;

}