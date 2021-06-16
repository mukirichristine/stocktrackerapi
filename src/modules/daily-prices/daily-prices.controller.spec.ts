import { Test, TestingModule } from '@nestjs/testing';
import { DailyPricesController } from './daily-prices.controller';

describe('DailyPricesController', () => {
  let controller: DailyPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyPricesController],
    }).compile();

    controller = module.get<DailyPricesController>(DailyPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
