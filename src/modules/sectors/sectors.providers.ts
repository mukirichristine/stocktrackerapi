import { Sector } from './sector.entity';
import { SECTOR_REPOSITORY } from '../../core/constants';

export const sectorsProviders = [{
    provide: SECTOR_REPOSITORY,
    useValue: Sector,
}];