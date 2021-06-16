import { Test, TestingModule } from '@nestjs/testing';
import { DailyPricesService } from './daily-prices.service';

describe('DailyPricesService', () => {
  let service: DailyPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyPricesService],
    }).compile();

    service = module.get<DailyPricesService>(DailyPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
