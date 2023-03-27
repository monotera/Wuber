import {RiderService} from "../service/rider.service";
import {RiderController} from "./rider.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {PaymentMethodDTO} from "../dto/paymentMethodDTO.dto";

describe('RiderController', () => {
    let riderController: RiderController;
    const mockRiderService = {
        findAll: jest.fn(() => {
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
        findOne: jest.fn().mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": "Token",
            "acceptanceToken": "Token",
            "id": 1,
            "isAvailable": true
        }).mockReturnValueOnce(null),
        createPaymentMethod: jest.fn().mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": "credit_token",
            "acceptanceToken": "acc_token",
            "id": 1,
            "isAvailable": true
        }).mockReturnValueOnce({
            "name": "test1",
            "email": "tesw@tes.com",
            "creditCardPaymentSource": null,
            "acceptanceToken": null,
            "id": 1,
            "isAvailable": true
        })
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RiderController],
            providers: [{
                provide: RiderService,
                useValue: mockRiderService
            }],
        }).compile();

        riderController = module.get<RiderController>(RiderController);
    });

    it('should be defined', () => {
        expect(riderController).toBeDefined();
    });

    describe('find all riders', () => {
        it('should find 2 riders', async () => {
            let riders = await riderController.findAll();
            expect(riders.length).toEqual(2);
        });
    });

    describe('find single rider', () => {
        it('should find 1 rider', async () => {
            let rider = await riderController.findOne(1);
            expect(rider?.id).toEqual(1);
        });
        it('should find no riders', async () => {
            let rider = await riderController.findOne(2);
            expect(rider?.id).toBeUndefined();
        });
    });

    describe('Create payment method', () => {
        it('should update rider with payment method', () => {
            let paymentDTO = new PaymentMethodDTO()
            paymentDTO.tokenizeCard = "card_token";
            paymentDTO.acceptance_token = "acc_token"
            let rider = riderController.createPaymentMethod(1, paymentDTO);
            expect(rider).resolves.toEqual({
                "name": "test1",
                "email": "tesw@tes.com",
                "creditCardPaymentSource": "credit_token",
                "acceptanceToken": "acc_token",
                "id": 1,
                "isAvailable": true
            });
        });
        it('should not update rider with payment method', () => {
            let paymentDTO = new PaymentMethodDTO()
            paymentDTO.tokenizeCard = "invalid_token";
            paymentDTO.acceptance_token = "acc_token"
            let rider = riderController.createPaymentMethod(1, paymentDTO);
            expect(rider).resolves.toEqual({
                "name": "test1",
                "email": "tesw@tes.com",
                "creditCardPaymentSource": null,
                "acceptanceToken": null,
                "id": 1,
                "isAvailable": true
            });
        });
    })
});