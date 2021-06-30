import { Injectable, Inject } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';
import { COMPANY_REPOSITORY, SECTOR_REPOSITORY } from '../../core/constants';
import { Sector } from '../sectors/sector.entity';
import { StockExchange } from '../stock-exchanges/stock-exchange.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';


@Injectable()
export class CompaniesService {

    constructor(@InjectRepository(CompanyRepository) private readonly companyRepository: CompanyRepository) { }

    async create(company: Company): Promise<Company> {
        return await this.companyRepository.create(company);
    }

    async findAll(): Promise<Company[]> {
        return await this.companyRepository.findAll();
    }

    async findOne(id): Promise<Company> {
        return await this.companyRepository.findOne(id);
    }
    async findOneUsingTradingSymbol(trading_symbol): Promise<Company> {
        return await this.companyRepository.findByTradingSymbol(trading_symbol);
    }

    async delete(id) {
        return await this.companyRepository.delete(id);
    }

    /* async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.companyRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }*/
} 