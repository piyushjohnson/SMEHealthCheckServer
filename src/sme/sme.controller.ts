import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSMEDto } from './create_sme.dto';
import { SMEService } from './sme.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import UploadFilesDto from './upload_files.dto';
import { UpdateSMEDto } from './update_sme.dto';

@Controller('sme')
export class SmeController {
  constructor(private smeService: SMEService) {}

  @Get()
  getAllSME() {
    return this.smeService.findAll();
  }

  @Post()
  insertSME(@Body() smeDto: CreateSMEDto) {
    return this.smeService.create(smeDto);
  }

  @Patch()
  updateSME(@Body() smeDto: UpdateSMEDto) {
    return this.smeService.update(smeDto, smeDto.id);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'smeDocuments', maxCount: 6 }]),
  )
  async uploadFiles(
    @Body() uploadFilesDto: UploadFilesDto,
    @UploadedFiles() files: { smeDocuments?: Express.Multer.File[] },
  ) {
    const fileLinks = await this.smeService.uploadFiles(files.smeDocuments);
    const updatedSme: Omit<UpdateSMEDto, 'id'> = {
      Documents: fileLinks,
    };
    return await this.smeService.update(updatedSme, uploadFilesDto.id);
  }
}
