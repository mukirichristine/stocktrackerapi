import { Company } from './company.entity';
import { COMPANY_REPOSITORY } from '../../core/constants';

export const companiesProviders = [{
    provide: COMPANY_REPOSITORY,
    useValue: Company,
}];