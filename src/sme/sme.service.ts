import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SME } from './sme.entity';
import { CreateSMEDto } from './create_sme.dto';
import { instanceToPlain } from 'class-transformer';

type ValidationError = {
  error: string;
  fieldName: string;
};

@Injectable()
export class SMEService {
  constructor(
    @Inject('SME_REPOSITORY')
    private smeRepository: typeof SME,
  ) {}

  async findAll(): Promise<SME[]> {
    return this.smeRepository.findAll<SME>();
  }

  async create(smeDto: CreateSMEDto): Promise<SME> {
    const sme = instanceToPlain(smeDto);
    try {
      return await this.smeRepository.create(sme);
    } catch (rootError) {
      if (Array.isArray(rootError.errors)) {
        const validationErrors: ValidationError[] = rootError.errors
          .filter((error) => error.type === 'Validation error')
          .map((error) => {
            return {
              error: error.message,
              fieldName: error.path,
            };
          });
        if (Array.isArray(validationErrors) && validationErrors.length > 0) {
          throw new UnprocessableEntityException(validationErrors);
        } else {
          throw rootError;
        }
      }
      throw rootError;
    }
  }
}
