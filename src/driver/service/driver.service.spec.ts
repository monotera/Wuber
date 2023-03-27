import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {DriversService} from "./drivers.service";
import {Driver} from "../models/driver.entity";


describe('DriverService', () => {
    let driverService: DriversService;

    const mockDriverRepository = {
        find: jest.fn().mockReturnValueOnce([{
            "id": 1,
            "name": "leni",
            "licensePlate": "456",
            "currentLat": "5.000000000000000",
            "currentLong": "5.000000000000000",
            "isAvailable": true
        }]).mockReturnValueOnce([])
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DriversService, {
                provide: getRepositoryToken(Driver),
                useValue: mockDriverRepository
            }],
        }).compile();

        driverService = module.get<DriversService>(DriversService);
    });

    it('should be defined', () => {
        expect(driverService).toBeDefined();
    });

    describe('Check if there are available drivers', () => {
        it('should confirm driver is available', async () => {
            expect(await driverService.fetchAvailableDriverId()).toEqual(1);
        });
        it('should throw error', async () => {
            try {
                await driverService.fetchAvailableDriverId()
            } catch (e) {
                expect(e.message).toEqual("there are no available drivers.");
            }
        });
    });
});