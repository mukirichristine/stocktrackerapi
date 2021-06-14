import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { StockExchangeDto } from './dto/stock-exchange.dto';
import { StockExchangesService } from './stock-exchanges.service';
import { StockExchange as StockExchangeEntity} from './stock-exchange.entity';

@Controller('stockexchanges')
export class StockExchangesController {

    constructor(private readonly stockExchangesService: StockExchangesService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.stockExchangesService.findAll();
    }
    @Post()
    async create(@Body() stockExchange: StockExchangeEntity): Promise<StockExchangeEntity> {
        // create a new post and return the newly created post
        return await this.stockExchangesService.create(stockExchange);
    }
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<StockExchangeEntity> {
        // find the post with this id
        const stockExchange = await this.stockExchangesService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!stockExchange) {
            throw new NotFoundException('This Stock Exchange doesn\'t exist');
        }

        // if post exist, return the post
        return stockExchange;
    }
}
