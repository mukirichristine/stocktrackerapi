import { Injectable, Inject } from '@nestjs/common';
import { DailyPrice } from './daily-prices.entity';
import { DailyPriceDto } from './dto/daily-price.dto';
import { DailyStatsDto } from './dto/daily-stats.dto';
import { DAILY_PRICE_REPOSITORY } from '../../core/constants';
import { Company } from '../companies/company.entity';
import { Sequelize } from 'sequelize-typescript'



@Injectable()
export class DailyPricesService {


    constructor(@Inject(DAILY_PRICE_REPOSITORY) private readonly dailyPriceRepository: typeof DailyPrice) { }

    async create(company: DailyPrice): Promise<DailyPrice> {
        return await this.dailyPriceRepository.create(company);
    }

    async findAll(): Promise<DailyPrice[]> {
        return await this.dailyPriceRepository.findAll();
    }

    async findOne(id): Promise<DailyPrice> {
        return await this.dailyPriceRepository.findOne({
        	where: { id },
        	include: [{ model: Company}],
    	});
    }

    async delete(id) {
        return await this.dailyPriceRepository.destroy({ where: { id} });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.dailyPriceRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
    


    async dailyStatistics(): Promise<DailyPrice[]> {
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
    }
    async dailyStats(): Promise<DailyPrice[]> {
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
    }
}