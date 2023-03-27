import {Test, TestingModule} from '@nestjs/testing';
import {TripService} from './trip.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Trip} from "../models/trip.entity";
import {InvoiceService} from "./invoice.service";
import {RiderService} from "../../rider/service/rider.service";
import {DriversService} from "../../driver/service/drivers.service";
import {BasicTripInitDTO} from "../dto/basicTripInit.dto";
import {BasicTripEndDTO} from "../dto/basicTripEnd.dto";

describe('TripService', () => {
    let service: TripService;
    const mockTripRepository = {
        create: jest.fn().mockReturnValueOnce({
            "startTime": "2023-03-27T03:35:43.462Z",
            "startLat": 2,
            "startLong": 2,
            "driver": {
                "id": 1
            },
            "rider": {
                "id": 1
            },
            "endTime": null,
            "endLat": null,
            "endLong": null,
            "id": 1
        }),
        save: jest.fn().mockReturnValueOnce({
            "startTime": "2023-03-27T03:35:43.462Z",
            "startLat": 2,
            "startLong": 2,
            "driver": {
                "id": 1
            },
            "rider": {
                "id": 1
            },
            "endTime": null,
            "endLat": null,
            "endLong": null,
            "id": 1
        }),
        findOne: jest.fn().mockReturnValueOnce({
            "id": 3,
            "startTime": new Date("2023-03-27T06:23:40.464Z"),
            "endTime": null,
            "startLat": 2.00,
            "startLong": 2.0,
            "endLat": null,
            "endLong": null,
            "driver": {
                "id": 1,
                "name": "leni",
                "licensePlate": "456",
                "currentLat": 5,
                "currentLong": 5,
                "isAvailable": false
            },
            "rider": {
                "id": 1,
                "name": "this5",
                "email": "tes@tes.com",
                "isAvailable": false
            },
            "invoice": {
                "basePrice": 3500,
                "finalPrice": 4243,
                "totalKM": 4.242640687119285,
                "totalMin": 0,
                "paymentReference": "661e2a25-0b4c-44e6-af8d-1dc5261a971f",
                "id": 3
            }
        }).mockReturnValueOnce(null)
    }
    const mockInvoiceService = {
        create: jest.fn().mockReturnValueOnce({
            "basePrice": 3500,
            "finalPrice": 4243,
            "totalKM": 4.242640687119285,
            "totalMin": 0,
            "paymentReference": "661e2a25-0b4c-44e6-af8d-1dc5261a971f",
            "id": 3
        })
    }
    const mockRiderService = {
        isRiderAvailable: jest.fn().mockReturnValueOnce(true),
        updateAvailability: jest.fn().mockReturnValueOnce(true)
    }
    const mockDriverService = {
        fetchAvailableDriverId: jest.fn().mockReturnValueOnce(1),
        updateAvailability: jest.fn().mockReturnValueOnce(true)
    }
    const mockInfo = {
        "riderId": 1,
        "riderCurrentLat": 2,
        "riderCurrentLong": 2
    } as BasicTripInitDTO

    const mockEndTripInfo = {
        "tripId": 1,
        "tripEndLat": 5,
        "tripEndLong": 5
    } as BasicTripEndDTO;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TripService, {
                provide: getRepositoryToken(Trip),
                useValue: mockTripRepository
            }, {
                provide: InvoiceService,
                useValue: mockInvoiceService
            }, {
                provide: RiderService,
                useValue: mockRiderService
            }, {
                provide: DriversService,
                useValue: mockDriverService
            }],
        }).compile();

        service = module.get<TripService>(TripService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('Test start a trip', () => {
        it('should start a trip', async () => {

            let new_trip = await service.startATrip(mockInfo);
            expect(new_trip).toEqual({
                "startTime": expect.anything(),
                "startLat": 2,
                "startLong": 2,
                "driver": {
                    "id": 1
                },
                "rider": {
                    "id": 1
                },
                "endTime": null,
                "endLat": null,
                "endLong": null,
                "id": expect.anything()
            })
        });
    });
    describe('Test end a trip', () => {
        it("should not end a trip because its already done", async () => {
            try {
                await service.finishATrip(mockEndTripInfo)
            } catch (error) {
                expect(error.message).toEqual("The trip is already done")
            }
        })
        it("should not end a trip because it doesn'exist", async () => {
            try {
                await service.finishATrip(mockEndTripInfo)
            } catch (error) {
                expect(error.message).toEqual("Invalid trip id")
            }
        })
    });
});
