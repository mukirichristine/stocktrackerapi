import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DailyPriceDto } from './dto/daily-price.dto';
import { DailyPricesService } from './daily-prices.service';
import { DailyPrice as DailyPriceEntity} from './daily-prices.entity';


@Controller('dailyprices')
export class DailyPricesController {

    constructor(private readonly dailyPricesService: DailyPricesService) { }

    @Get()
    async findAll() {
        
        return await this.dailyPricesService.findAll();
    }
    @Post()
    async create(@Body() stockExchange: DailyPriceEntity): Promise<DailyPriceEntity> {
        
        return await this.dailyPricesService.create(stockExchange);
    }
    @Get('price/:id')
    async findOne(@Param('id') id: number): Promise<DailyPriceEntity> {
        
        
        const dailyPrice = await this.dailyPricesService.findOne(id);

        
        if (!dailyPrice) {
            throw new NotFoundException('This Daily Price doesn\'t exist');
        }

        
        return dailyPrice;
    }

    @Get('stats')
    async getDailyStatistics(){
        
        return await this.dailyPricesService.dailyStats()
    }
}


