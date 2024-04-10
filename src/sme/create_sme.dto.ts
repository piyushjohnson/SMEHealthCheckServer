import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSMEDto {
  @IsString({
    message: 'Provide valid UEN number',
  })
  UEN: string;

  @IsString({
    message: 'Provide valid company name',
  })
  @IsNotEmpty({
    message: 'Provide non-empty company name',
  })
  CompanyName: string;

  @IsString({
    message: 'Provide valid full name',
  })
  @IsNotEmpty({
    message: 'Provide non-empty full name',
  })
  FullName: string;

  @IsString({
    message: 'Provide valid position in company',
  })
  @IsNotEmpty({
    message: 'Provide non-empty position in company',
  })
  PositionInCompany: string;

  @IsString({
    message: 'Provide valid email',
  })
  @IsNotEmpty({
    message: 'Provide non-empty email',
  })
  Email: string;

  @IsString({
    message: 'Provide valid mobile number',
  })
  MobNumber: string;
}
