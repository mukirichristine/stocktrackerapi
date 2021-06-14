import { Sequelize } from 'sequelize-typescript';
import { Sector } from 'src/modules/sectors/sector.entity';
import { StockExchange } from 'src/modules/stock-exchanges/stock-exchange.entity';
import { User } from 'src/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Sector,StockExchange]);
        await sequelize.sync();
        return sequelize;
    },
}];