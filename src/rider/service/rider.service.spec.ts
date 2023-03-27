import {RiderService} from "./rider.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Rider} from "../models/rider.entity";

describe('RiderService', () => {
    let riderService: RiderService;

    const mockRiderRepository = {
        find: jest.fn(() => {
            return [{
                "name": "test2",
                "email": "tes@tes.com",
                "creditCardPaymentSource": null,
                "acceptanceToken": null,
                "id": 2,
                "isAvailable": true
            }, {
                "name": "test1",
                "email": "tesw@tes.com",
                "creditCardPaymentSource": "Token",
                "acceptanceToken": "Token",
                "id": 1,
                "isAvailable": true
            }]
        }),
        findOneBy: jest.fn().mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": "Token",
            "acceptanceToken": "Token",
            "id": 1,
            "isAvailable": true
        }).mockReturnValueOnce(null),
        findOne: jest.fn().mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": "Token",
            "acceptanceToken": "Token",
            "id": 1,
            "isAvailable": true
        }).mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": null,
            "acceptanceToken": "token",
            "id": 1,
            "isAvailable": false
        }).mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": "token",
            "acceptanceToken": null,
            "id": 1,
            "isAvailable": false
        }).mockReturnValueOnce(null)
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RiderService, {
                provide: getRepositoryToken(Rider),
                useValue: mockRiderRepository
            }],
        }).compile();

        riderService = module.get<RiderService>(RiderService);
    });

    it('should be defined', () => {
        expect(RiderService).toBeDefined();
    });

    describe('find all riders', () => {
        it('should find 2 riders', async () => {
            let riders = await riderService.findAll();
            expect(riders.length).toEqual(2);
        });
    });
    describe('find single rider', () => {
        it('should find 1 rider', async () => {
            let rider = await riderService.findOne(1);
            expect(rider?.id).toEqual(1);
        });
        it('should find no riders', async () => {
            let rider = await riderService.findOne(2);
            expect(rider?.id).toBeUndefined();
        });
    });

    describe('Check if rider is available', () => {
        it('should confirm rider is available', async () => {
            expect(await riderService.isRiderAvailable(1)).toBeUndefined();
        });
        it('should raise exception no paymentSource', async () => {
            try {
                await riderService.isRiderAvailable(1)
            } catch (error) {
                expect(error.message).toEqual("The given rider hasn't created a paymentSource.");
            }
        });
        it('should raise exception no access token', async () => {
            try {
                await riderService.isRiderAvailable(1)
            } catch (error) {
                expect(error.message).toEqual("The given rider hasn't agreed to the politics of the page.");
            }
        });
        it('should raise exception no rider', async () => {
            try {
                await riderService.isRiderAvailable(1)
            } catch (error) {
                expect(error.message).toEqual("The given rider is not available.");
            }
        });
    });

});