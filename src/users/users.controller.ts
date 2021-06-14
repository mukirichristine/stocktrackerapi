import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get(':username')
    get(@Param() params) {
        return this.service.findOneByUsername(params.username);
    }
    @Get()
    async findAll() {
        // get all posts in the db
        return await this.service.findAll();
    }

    
}