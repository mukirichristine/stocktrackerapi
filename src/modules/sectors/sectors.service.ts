import { Injectable, Inject } from '@nestjs/common';
import { Sector } from './sector.entity';
import { SectorDto } from './dto/sector.dto';
import { SECTOR_REPOSITORY } from '../../core/constants';

@Injectable()
export class SectorsService {
    constructor(@Inject(SECTOR_REPOSITORY) private readonly sectorRepository: typeof Sector) { }

    async create(sector: Sector): Promise<Sector> {
        return await this.sectorRepository.create(sector);
    }

    async findAll(): Promise<Sector[]> {
        return await this.sectorRepository.findAll();
    }

    async findOne(id): Promise<Sector> {
        return await this.sectorRepository.findOne({
        	where: { id },
        	include: [{ model: Sector }],
    	});
    }

    async delete(id) {
        return await this.sectorRepository.destroy({ where: { id} });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedPost]] = await this.sectorRepository.update({ ...data }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
}