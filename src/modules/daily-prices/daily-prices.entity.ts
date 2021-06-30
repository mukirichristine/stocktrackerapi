import { Table, Column,  Entity, PrimaryGeneratedColumn, ManyToOne, Unique} from 'typeorm';
import { Company } from '../companies/company.entity';


@Entity('dailyprices')
@Unique(['company.id','createdAt'])
export class DailyPrice {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    openingPrice: number;

    @Column("double")
    closingPrice: number;

    @Column({
        type: 'date',
        nullable: false,
    })
    createdAt: string;

    @ManyToOne(() => Company, (company: Company) => company.dailyPrices)
    public company: Company;

 
}