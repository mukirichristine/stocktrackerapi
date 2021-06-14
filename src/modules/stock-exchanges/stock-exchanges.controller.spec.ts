import { Test, TestingModule } from '@nestjs/testing';
import { StockExchangesController } from './stock-exchanges.controller';

describe('StockExchangesController', () => {
  let controller: StockExchangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockExchangesController],
    }).compile();

    controller = module.get<StockExchangesController>(StockExchangesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
