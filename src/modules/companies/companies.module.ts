import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { companiesProviders } from './companies.providers';
import { Company } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  providers: [CompaniesService,...companiesProviders],
  controllers: [CompaniesController],
  exports: [CompaniesService]

})
export class CompaniesModule {}
