import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';


@Table
export class StockExchange extends Model<StockExchange> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
 
}