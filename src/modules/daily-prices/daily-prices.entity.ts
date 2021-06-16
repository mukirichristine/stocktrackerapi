import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Company } from '../companies/company.entity';


@Table
export class DailyPrice extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    openingPrice: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    closingPrice: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    companyId: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    createdAt: string;


    @BelongsTo(() => Company)
    company: Company;

 
}