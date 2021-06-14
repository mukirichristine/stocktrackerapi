import { StockExchange } from './stock-exchange.entity';
import { STOCK_EXCHANGE_REPOSITORY } from '../../core/constants';

export const stockExchangesProviders = [{
    provide: STOCK_EXCHANGE_REPOSITORY,
    useValue: StockExchange,
}];