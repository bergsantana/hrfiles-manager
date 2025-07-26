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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a employee' })
  @ApiBody({ type: Employee })
  @ApiResponse({
    status: 200,
    description: 'A User with email, cpf, and date of hiring ',
    example: {
      _id: 'adaffeee',
      email: 'josesilva@gmail.com',
      hired_at: '01/12/2022',
      cpf: '123.122.123-12',
    },
  })
  @HttpCode(HttpStatus.OK)
  async register(@Body() employees: Employee[]) {
    return this.employeeService.register(employees);
  }

  @ApiOperation({ summary: 'List all employees' })
  @Get('find-all')
  async findAll() {
    return await this.employeeService.findAll();
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
