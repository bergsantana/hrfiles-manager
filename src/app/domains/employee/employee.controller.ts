import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeDocument } from 'src/app/schemas/employee.schema';
import { updateEmployeeDTO } from './dtos/update.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() employees: Employee[]) {
    return this.employeeService.register(employees);
  }

  @Get('find-one/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() employeesData: updateEmployeeDTO[]) {
    await this.employeeService.update(employeesData);
  }
}
