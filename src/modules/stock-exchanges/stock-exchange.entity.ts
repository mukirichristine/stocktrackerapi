import { Table, Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Company } from '../companies/company.entity';


@Entity('stockexchanges')
export class StockExchange {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: false,
    })
    name: string;
    
    @OneToMany(() => Company, (company: Company) => company.stocKExchange)
    public companies: Company[];
 
}