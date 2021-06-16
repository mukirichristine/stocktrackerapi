import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sector } from '../sectors/sector.entity';
import { StockExchange } from '../stock-exchanges/stock-exchange.entity';


@Table
export class Company extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    trading_symbol: string;

    @ForeignKey(() => Sector)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sectorId: number;

    @BelongsTo(() => Sector)
    sector: Sector;

    @ForeignKey(() => StockExchange)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    stockExchangeId: number;

    @BelongsTo(() => StockExchange)
    stockexchange: StockExchange;
}