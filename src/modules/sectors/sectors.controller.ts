import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { SectorDto } from './dto/sector.dto';
import { SectorsService } from './sectors.service';
import { Sector as SectorEntity} from './sector.entity';

@Controller('sectors')
export class SectorsController {
    constructor(private readonly sectorService: SectorsService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.sectorService.findAll();
    }
    @Post()
    async create(@Body() sector: SectorEntity): Promise<SectorEntity> {
        // create a new post and return the newly created post
        return await this.sectorService.create(sector);
    }
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SectorEntity> {
        // find the post with this id
        const sector = await this.sectorService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!sector) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return sector;
    }
}
