import { Repository, EntityRepository } from 'typeorm';
import { Company } from './company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

    public async findAll(): Promise<Company[]> {
        return await this.find({});
    } 

    public async findById(productId: number): Promise<Company> {
        return await this.findOne(productId);
    }
    

    public async findByTradingSymbol(trading_symbol: string): Promise<Company> {
        return await this.findOne({trading_symbol});
    }



}