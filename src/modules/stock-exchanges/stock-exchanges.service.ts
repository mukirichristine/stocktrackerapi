import { Injectable, Inject } from '@nestjs/common';
import { StockExchange } from './stock-exchange.entity';
import { StockExchangeDto } from './dto/stock-exchange.dto';
import { STOCK_EXCHANGE_REPOSITORY } from '../../core/constants';
@Injectable()
export class StockExchangesService {

    constructor(@Inject(STOCK_EXCHANGE_REPOSITORY) private readonly stockExchangeRepository: typeof StockExchange) { }

    async create(stockExchange: StockExchange): Promise<StockExchange> {
        return await this.stockExchangeRepository.create(stockExchange);
    }

    async findAll(): Promise<StockExchange[]> {
        return await this.stockExchangeRepository.findAll();
    }

    async findOne(id): Promise<StockExchange> {
        return await this.stockExchangeRepository.findOne({
        	where: { id },
        	include: [{ model: StockExchange }],
    	});
    }

    async delete(id) {
        return await this.stockExchangeRepository.destroy({ where: { id} });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.stockExchangeRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
}