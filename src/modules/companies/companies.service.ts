import { Injectable, Inject } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';
import { COMPANY_REPOSITORY, SECTOR_REPOSITORY } from '../../core/constants';
import { Sector } from '../sectors/sector.entity';
import { StockExchange } from '../stock-exchanges/stock-exchange.entity';


@Injectable()
export class CompaniesService {

    constructor(@Inject(COMPANY_REPOSITORY) private readonly companyRepository: typeof Company) { }

    async create(company: Company): Promise<Company> {
        return await this.companyRepository.create(company);
    }

    async findAll(): Promise<Company[]> {
        return await this.companyRepository.findAll();
    }

    async findOne(id): Promise<Company> {
        return await this.companyRepository.findOne({
        	where: { id },
        	include: [{ model: Sector},{model : StockExchange}],
    	});
    }

    async delete(id) {
        return await this.companyRepository.destroy({ where: { id} });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.companyRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
}