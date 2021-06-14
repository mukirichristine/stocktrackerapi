import { Module } from '@nestjs/common';
import { StockExchangesService } from './stock-exchanges.service';
import { StockExchangesController } from './stock-exchanges.controller';
import { stockExchangesProviders } from './stcok-exchange.providers';

@Module({
  providers: [StockExchangesService,...stockExchangesProviders],
  controllers: [StockExchangesController]
})
export class StockExchangesModule {}
