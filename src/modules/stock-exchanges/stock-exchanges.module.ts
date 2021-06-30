import { Module } from '@nestjs/common';
import { StockExchangesService } from './stock-exchanges.service';
import { StockExchangesController } from './stock-exchanges.controller';
import { stockExchangesProviders } from './stcok-exchange.providers';
import { StockExchange } from './stock-exchange.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StockExchange])],
  providers: [StockExchangesService,...stockExchangesProviders],
  controllers: [StockExchangesController]
})
export class StockExchangesModule {}
