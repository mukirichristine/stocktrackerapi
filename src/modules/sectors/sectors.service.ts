import { Injectable, Inject } from '@nestjs/common';
import { Sector } from './sector.entity';
import { SectorDto } from './dto/sector.dto';
import { SECTOR_REPOSITORY } from '../../core/constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectorsService {
    constructor(@InjectRepository(Sector) private sectorRepository: Repository<Sector>) { }

    async create(sector: Sector): Promise<Sector> {
        return await this.sectorRepository.create(sector);
    }

    async findAll(): Promise<Sector[]> {
        return await this.sectorRepository.find();
    }

    async findOne(id): Promise<Sector> {
        return await this.sectorRepository.findOne(id);
    }

    async delete(id) {
        return await this.sectorRepository.delete(id);
    }

    /* async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.sectorRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    } */
}