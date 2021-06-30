import { Injectable, Inject } from '@nestjs/common';
import { StockExchange } from './stock-exchange.entity';
import { StockExchangeDto } from './dto/stock-exchange.dto';
import { STOCK_EXCHANGE_REPOSITORY } from '../../core/constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class StockExchangesService {

    constructor(@InjectRepository(StockExchange) private stockExchangeRepository: Repository<StockExchange>) { }

    async create(stockExchange: StockExchange): Promise<StockExchange> {
        return await this.stockExchangeRepository.save(stockExchange);
    }

    async findAll(): Promise<StockExchange[]> {
        return await this.stockExchangeRepository.find();
    }

    async findOne(id): Promise<StockExchange> {
        return await this.stockExchangeRepository.findOne(id);
    }

    async delete(id) {
        return await this.stockExchangeRepository.delete(id);
    }

    /* async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.stockExchangeRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    } */
}