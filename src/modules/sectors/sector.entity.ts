import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Company } from '../companies/company.entity';


@Entity('sectors')
export class Sector{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: false,
    })
    name: string;

    @OneToMany(() => Company, (company: Company) => company.sector)
    public companies: Company[];
    

    
}