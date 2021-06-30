import { Body, Controller, Get, NotFoundException, Param, Post, UseFilters } from '@nestjs/common';
import { DailyPriceDto } from './dto/daily-price.dto';
import { DailyPricesService } from './daily-prices.service';
import { CompaniesService } from '../companies/companies.service';
import { DailyCrawlerDto } from './dto/daily-crawler.dto';
import { WeeklyCrawlerDto } from './dto/weekly-crawler.dto'
import { DailyPrice as DailyPriceEntity} from './daily-prices.entity';
import { filter } from 'rxjs/operators';
import { chain, allowRegex, ignoreDoubles } from 'crawler-ts';
import { createCrawler, allowHtml, allowProtocols } from 'crawler-ts-htmlparser2';
import { selectAll,selectOne } from 'css-select';
import axios from 'axios';
import cheerio from 'cheerio';
import { Company } from '../companies/company.entity';
import { GlobalExceptionFilter } from 'src/core/filters/global.exception';
interface DailyPriceData {
    companyAbbr:string,
    createdAt:string,
    openingPrice:number,
    closingPrice:number
  }

@Controller('dailyprices')
export class DailyPricesController {

    constructor(private readonly dailyPricesService: DailyPricesService,
        private readonly companyPricesService: CompaniesService) { }

    @Get()
    async findAll() {
        
        return await this.dailyPricesService.findAll();
    }
    /* @Post()
    async create(@Body() stockExchange: DailyPriceEntity): Promise<DailyPriceEntity> {
        
        return await this.dailyPricesService.create(stockExchange);
    } */
    @Get('price/:id')
    async findOne(@Param('id') id: number): Promise<DailyPriceEntity> {
        
        
        const dailyPrice = await this.dailyPricesService.findOne(id);

        
        if (!dailyPrice) {
            throw new NotFoundException('This Daily Price doesn\'t exist');
        }

        
        return dailyPrice;
    }

    /* @Get('stats')
    async getDailyStatistics(){
        
        return await this.dailyPricesService.dailyStats()
    }
 */
    @Post('crawl')
    async getCrawledData(@Body() filterOptions: DailyCrawlerDto){
        const createdAt=filterOptions.currentDate.toString();
        
        const dailyPrices = await this.getDailyPrices(createdAt);
        const responses:any[]=[];
        for( const dailyPrice of dailyPrices){
            responses.push(await this.dailyPricesService.create(dailyPrice));
        }
        return responses;
    }
    @Post('weekly_crawl')
    async getWeeklyData(@Body() filterOptions: WeeklyCrawlerDto){
        const weekNumber = filterOptions.weekNumber;
        const year = filterOptions.year;

        const weekDays = await this.getDateOfISOWeek(weekNumber,year);
        const responses:any[]=[];
        for(const weekDay of weekDays){
            const dailyPrices = await this.getDailyPrices(weekDay);
            
            for( const dailyPrice of dailyPrices){
                responses.push(await this.dailyPricesService.create(dailyPrice));
            }
        }
        return responses;
    }
    async getDateOfISOWeek(w, y) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

        const temp = {
            d: ISOweekStart.getDate(),
            m: ISOweekStart.getMonth(),
            y: ISOweekStart.getFullYear(),
            }
        const numDaysInMonth = new Date(temp.y, temp.m + 1, 0).getDate()
        
        return Array.from({length: 7}, _ => {
        if (temp.d > numDaysInMonth){
            temp.m +=1;
            temp.d = 1;
            
        }      
        if(temp.m>9){
            return ""+temp.y+temp.m+temp.d++;
        }else{
            return ""+temp.y+"0"+temp.m+temp.d++;
        }
        
        });
    }
    async getDataFromUrl(createdAt: string): Promise<any>{
        const url = "https://live.mystocks.co.ke/price_list/" + createdAt;
        const AxiosInstance = axios.create();
        
        return AxiosInstance.get(url).then(
            response=>{
                return response.data;
            }
        )
    }


    async getDailyPrices(createdAt: string): Promise<DailyPriceData[]> {
        
        let endReached:boolean;
        return await this.getDataFromUrl(createdAt).then(response => {
            const dailyPrices: DailyPriceData[] = [];
            const $ = cheerio.load(response); // Load the HTML string into cheerio
            const statsTable = $('.tblHoverHi > tbody >tr'); // Par
            statsTable.each((i, elem) => {
                if(endReached){
                    return;
                }
                const sector: string = $(elem).find('.b2 > h3').text(); // Parse the rank
                if (sector=='Exchange Traded Funds'){
                    endReached = true;
                    return;
                }
                const companyAbbr: string = $(elem).find('.nm:first-child').text();
                if (companyAbbr==''){
                    return;
                }
                const closingPrice: number = parseFloat($(elem).find('.n:nth(4)').text());
                const openingPrice: number  = parseFloat($(elem).find('.n:nth(5)').text());
                const dailyPrice:DailyPriceDto = {
                    openingPrice,
                    closingPrice,
                    companyAbbr,
                    createdAt,
                };
                dailyPrices.push(dailyPrice);
                
              });
              return dailyPrices;
          });
        
    }
    
    
}




