import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { DailyPrice} from '../daily-prices/daily-prices.entity';
import { Sector } from '../sectors/sector.entity';
import { StockExchange } from '../stock-exchanges/stock-exchange.entity';


@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable:false
    })
    name: string;

    @Column({
        nullable:false
    })
    trading_symbol: string;

    @ManyToOne(() => Sector, (sector: Sector) => sector.companies)
    public sector: Sector;

    @ManyToOne(() => StockExchange, (stockExchange: StockExchange) => stockExchange.companies)
    public stocKExchange: StockExchange;

    @OneToMany(() => DailyPrice, (dailyPrice: DailyPrice) => dailyPrice.company)
    public dailyPrices: DailyPrice[];

    
}