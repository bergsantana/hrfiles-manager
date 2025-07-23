import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HrFileService } from './hrfile.service';
import { HrFileBindDTO, HrFileTypeDTO } from './dtos/file-type.dto';
import { HrFileDTO } from './dtos/hrfile.dto';

@Controller('hrfile')
export class HrFileController {
  constructor(private readonly hrFileService: HrFileService) {}

  @Post('register-type')
  async registerFileType(@Body() fileTypes: HrFileTypeDTO[]) {
    console.log('body?', fileTypes);
    return await this.hrFileService.registerFileType(fileTypes);
  }

  @Post('save-biding-file-employee')
  async bindFileTypeEmployee(@Body() bindData: HrFileDTO[]) {
    return await this.hrFileService.saveHrFile(bindData);
  }

  @Get('get-documentation-status')
  async getDocumentationStatus(@Query('employeeId') employeeId: string) {
    console.log('query?', employeeId);
    return this.hrFileService.getAllDocumentationStatus(employeeId);
  }

  @Get('find-all-pending')
  async findAllPending(
    @Query('page') page: string,
    @Query('page-size') pageSize: string,
    @Query('employee-id') employeeId: string,
    @Query('file-id') hrFileTypeId: string,
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
