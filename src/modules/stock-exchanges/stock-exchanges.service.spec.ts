import { Test, TestingModule } from '@nestjs/testing';
import { StockExchangesService } from './stock-exchanges.service';

describe('StockExchangesService', () => {
  let service: StockExchangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockExchangesService],
    }).compile();

    service = module.get<StockExchangesService>(StockExchangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
