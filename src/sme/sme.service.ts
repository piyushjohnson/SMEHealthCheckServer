import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { CreateSMEDto } from './create_sme.dto';
import { SME } from './sme.entity';
import { HttpService } from '@nestjs/axios';
import { readFile, rm } from 'fs/promises';
import { UpdateSMEDto } from './update_sme.dto';

type ValidationError = {
  error: string;
  fieldName: string;
};

@Injectable()
export class SMEService {
  constructor(
    @Inject('SME_REPOSITORY')
    private smeRepository: typeof SME,
    private readonly httpService: HttpService,
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

  async update(smeDto: Omit<UpdateSMEDto, 'id'>, id: number) {
    const sme = instanceToPlain(smeDto);
    return this.smeRepository.update(sme, {
      where: {
        id,
      },
    });
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const FILEIOAPIKEY = 'R4T3JO5.A20C4VA-SV04NCW-HE726CB-GJHS26G';
    if (files) {
      const allFilesPromise = files.map(async (file) => {
        const formData = new FormData();
        const fileData = await readFile(file.path);
        formData.append('file', new Blob([fileData]), file.originalname);
        const fileUploadResponse = await this.httpService.axiosRef.post<{
          id: string;
          success: boolean;
          name: string;
          key: string;
          size: number;
          mimeType: string;
          link: string;
        }>('https://file.io/', formData, {
          headers: {
            Authorization: `Bearer ${FILEIOAPIKEY}`,
          },
        });
        await rm(file.path);
        if (fileUploadResponse.status === 200) {
          const { link } = fileUploadResponse.data;
          return link;
        } else {
          throw Error(`${file.originalname} file not uploaded`);
        }
      });
      return Promise.all(allFilesPromise);
    }
  }
}
