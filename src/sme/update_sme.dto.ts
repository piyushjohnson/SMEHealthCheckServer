import { IsArray, IsNumber } from 'class-validator';

export class UpdateSMEDto {
  @IsNumber(null, { message: 'Provide valid id of SME to update' })
  id: number;

  UEN?: string;

  CompanyName?: string;

  FullName?: string;

  PositionInCompany?: string;

  Email?: string;

  MobNumber?: string;

  @IsArray({
    message: 'Provide a valid list of documents',
  })
  Documents?: string[];
}
