import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';


@Table
export class Sector extends Model<Sector> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    

    
}