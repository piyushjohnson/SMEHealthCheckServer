import { Sequelize } from 'sequelize-typescript';
import { SME } from './sme/sme.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-black-wind-a15gtyxm.ap-southeast-1.aws.neon.tech',
        port: 5432,
        dialectOptions: {
          ssl: {
            require: true,
          },
        },
        username: 'sme_owner',
        password: 'DymRMEPT1J5U',
        database: 'sme',
      });
      sequelize.addModels([SME]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
