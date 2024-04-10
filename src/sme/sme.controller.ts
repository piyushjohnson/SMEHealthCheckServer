import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSMEDto } from './create_sme.dto';
import { SMEService } from './sme.service';

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
}
