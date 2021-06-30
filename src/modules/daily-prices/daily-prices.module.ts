import { Module } from '@nestjs/common';
import { DailyPricesService } from './daily-prices.service';
import { DailyPricesController } from './daily-prices.controller';
import { dailyPricesProviders } from './daily-prices.providers';
import { DailyPriceRepository } from './daily-prices.repository';
import { CompaniesModule } from '../companies/companies.module';
import { DailyPrice } from './daily-prices.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../companies/company.repository';

@Module({
  providers: [DailyPricesService,...dailyPricesProviders],
  controllers: [DailyPricesController],
  imports: [CompaniesModule,TypeOrmModule.forFeature([DailyPriceRepository,CompanyRepository])]
  
})
export class DailyPricesModule {}
