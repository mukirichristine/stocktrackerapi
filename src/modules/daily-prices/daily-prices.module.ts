import { Module } from '@nestjs/common';
import { DailyPricesService } from './daily-prices.service';
import { DailyPricesController } from './daily-prices.controller';
import { dailyPricesProviders } from './daily-prices.providers';

@Module({
  providers: [DailyPricesService,...dailyPricesProviders],
  controllers: [DailyPricesController]
})
export class DailyPricesModule {}
