import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { SectorsModule } from './modules/sectors/sectors.module';
import { StockExchangesModule } from './modules/stock-exchanges/stock-exchanges.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { DailyPricesModule } from './modules/daily-prices/daily-prices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockExchange } from './modules/stock-exchanges/stock-exchange.entity';
import { Sector } from './modules/sectors/sector.entity';
import { Company } from './modules/companies/company.entity';
import { DailyPrice } from './modules/daily-prices/daily-prices.entity';

@Module({
  imports: [
    //ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Company,Sector,StockExchange,DailyPrice],
        synchronize: true,
        migrations: ['src/migration/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migration'
        },
      
      })
    }),
    //DatabaseModule,
    SectorsModule,
    StockExchangesModule,
    CompaniesModule,
    DailyPricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
