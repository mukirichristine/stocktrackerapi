import { DailyPrice } from './daily-prices.entity';
import { DAILY_PRICE_REPOSITORY } from '../../core/constants';

export const dailyPricesProviders = [{
    provide: DAILY_PRICE_REPOSITORY,
    useValue: DailyPrice,
}];