import { DailyPriceData } from 'src/core/interfaces/dailyprice.interface';
import { Repository, EntityRepository } from 'typeorm';
import { Company } from '../companies/company.entity';
import { DailyPrice } from './daily-prices.entity';
import { DailyPriceDto } from './dto/daily-price.dto';

@EntityRepository(DailyPrice)
export class DailyPriceRepository extends Repository<DailyPrice> {

    
    public async findAll(): Promise<DailyPrice[]> {
        return await this.find({});
    } 
    public async insertDailyPrice(
        insertDailyPrice: DailyPriceDto,
        company: Company
    ): Promise<DailyPrice> {
        const { openingPrice, closingPrice, companyAbbr, createdAt } = insertDailyPrice;
        const price = new DailyPrice();
        price.openingPrice = openingPrice;
        price.closingPrice = closingPrice;
        price.createdAt = createdAt;
        price.company = company;
        try{
            await this.save(price);
        }catch(error){
            return error.message;
        }
        
        
        return price;
    } 
    
    

    

}