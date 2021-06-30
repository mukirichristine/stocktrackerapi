import { Injectable, Inject, } from '@nestjs/common';
import { DailyPrice } from './daily-prices.entity';
import { DailyPriceDto } from './dto/daily-price.dto';
import { DailyStatsDto } from './dto/daily-stats.dto';
import { DAILY_PRICE_REPOSITORY } from '../../core/constants';
import { Company } from '../companies/company.entity';
//import { Sequelize } from 'sequelize-typescript'
import { InsertDailyPriceDto } from './dto/insert-daily-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyPriceRepository } from './daily-prices.repository';
import { CompanyRepository } from '../companies/company.repository';
import { DailyPriceData } from 'src/core/interfaces/dailyprice.interface';

@Injectable()
export class DailyPricesService {


    constructor(
        @InjectRepository(DailyPriceRepository) private dailyPriceRepository: DailyPriceRepository,
        @InjectRepository(CompanyRepository) private companyRepository: CompanyRepository
    ) { }
    
    async create(company: DailyPriceDto): Promise<DailyPrice> {
        
        const company_info = await this.companyRepository.findByTradingSymbol(company.companyAbbr);
        return await this.dailyPriceRepository.insertDailyPrice(company,company_info);
                    
    }
    

    async findAll(): Promise<DailyPrice[]> {
        return await this.dailyPriceRepository.find();
    }

    async findOne(id): Promise<DailyPrice> {
        return await this.dailyPriceRepository.findOne(id);
    }
    

    async delete(id) {
        return await this.dailyPriceRepository.delete(id);
    }

   /*  async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.dailyPriceRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    } */
    


    /* async dailyStatistics(): Promise<DailyPrice[]> {
        return await this.dailyPriceRepository
                         .findAll({
                             attributes: [
                                 'companyId',
                                 [Sequelize.literal('ROUND(((closingPrice-openingPrice)/openingPrice)*100,3)'), 'change']
                                ],
                             where: {
                                 createdAt:new Date().setDate(new Date().getDate()-1)
                             }
                         });
    } */
    /* async dailyStats(): Promise<DailyPrice[]> {
        return await this.dailyPriceRepository.findAll({
            attributes: {
                include: [
                    'companyId',
                    [
                        Sequelize.literal(`(
                            SELECT ROUND(((closingPrice-openingPrice)/openingPrice)*100,3)
                            FROM dailyprices
                            WHERE
                                dailyprices.id = dailyprice.id
                                and
                                DATE(createdAt) = DATE(NOW())
                                
                        )`),
                        'ChangeInPrice'
                    ]
                ]
            },
            order: [
                [Sequelize.literal('ChangeInPrice'), 'DESC']
            ]
        });
    } */
}