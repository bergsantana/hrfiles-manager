import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { HrFileService } from './hrfile.service';
import { HrFileBindDTO, HrFileTypeDTO } from './dtos/file-type.dto';
import { HrFileDTO, SearchFilesDTO } from './dtos/hrfile.dto';
import { FileType } from 'src/app/schemas/file-type.schema';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { HRFile } from 'src/app/schemas/hr-file.schema';
import { Response } from 'express';

@Controller('hrfile')
export class HrFileController {
  constructor(private readonly hrFileService: HrFileService) {}

  @ApiBody({ type: FileType })
  @Post('register-type')
  async registerFileType(@Body() fileTypes: HrFileTypeDTO[]) {
    return await this.hrFileService.registerFileType(fileTypes);
  }

  @Get('list-all-types')
  async listAllTypes() {
    return await this.hrFileService.listAllTypes();
  }

  @ApiBody({ type: Array<HRFile> })
  @Post('save-biding-file-employee')
  async bindFileTypeEmployee(@Body() bindData: HrFileDTO[]) {
    await this.hrFileService.saveHrFile(bindData);
    return HttpStatus.ACCEPTED;
  }

  @Get('get-documentation-status')
  async getDocumentationStatus(@Query('employee-id') employeeId: string) {
    return this.hrFileService.getAllDocumentationStatus(employeeId);
  }

  @ApiQuery({ name: 'employee-id', required: false, type: String })
  @ApiQuery({ name: 'file-id', required: false, type: String })
  @Get('find-all-pending')
  async findAllPending(
    @Query('page') page: string,
    @Query('page-size') pageSize: string,
    @Query('employee-id') employeeId?: string,
    @Query('file-id') hrFileTypeId?: string,
  ) {
    return await this.hrFileService.allPendingDocuments({
      status: 'PENDING',
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      employeeId,
      hrFileTypeId,
    });
  }
}
