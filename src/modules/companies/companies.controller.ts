import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { CompaniesService } from './companies.service';
import { Company as CompanyEntity} from './company.entity';


@Controller('companies')
export class CompaniesController {


    constructor(private readonly companiesService: CompaniesService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.companiesService.findAll();
    }
    @Post()
    async create(@Body() stockExchange: CompanyEntity): Promise<CompanyEntity> {
        // create a new post and return the newly created post
        return await this.companiesService.create(stockExchange);
    }
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CompanyEntity> {
        // find the post with this id
        console.log(id)
        const company = await this.companiesService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!company) {
            throw new NotFoundException('This Company doesn\'t exist');
        }

        // if post exist, return the post
        return company;
    }
}

