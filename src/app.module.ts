import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { StockExchangesModule } from './modules/stock-exchanges/stock-exchanges.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { DailyPricesModule } from './modules/daily-prices/daily-prices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SectorsModule,
    StockExchangesModule,
    CompaniesModule,
    DailyPricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
