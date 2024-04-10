import { SME } from './sme.entity';

export const smeProviders = [
  {
    provide: 'SME_REPOSITORY',
    useValue: SME,
  },
];
