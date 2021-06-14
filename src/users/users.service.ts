import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../core/constants';

@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: User): Promise<User> {
        return await this.userRepository.create<User>(user);
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll<User>();
    }


    async findOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { username } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}