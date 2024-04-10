import { IsNumber } from 'class-validator';

export class UpdateSMEDto {
  @IsNumber(null, { message: 'Provide valid id of SME to update' })
  id: number;

  UEN?: string;

  CompanyName?: string;

  FullName?: string;

  PositionInCompany?: string;

  Email?: string;

  MobNumber?: string;

  Documents?: string[];
}
