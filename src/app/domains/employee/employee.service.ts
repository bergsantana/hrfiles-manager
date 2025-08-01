import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/app/schemas/employee.schema';
import { updateEmployeeDTO } from './dtos/update.dto';
import { formatDateToPtBr } from 'src/app/utils/formatDateToPtBr';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async register(employees: Employee[]) {
    return await this.employeeModel.insertMany(employees);
  }

  async findOne(id: string) {
    return await this.employeeModel.findOne({
      id,
    });
  }

  async findAll() {
    return await this.employeeModel.find();
  }

  async update(employeeData: updateEmployeeDTO[]) {
    for (const currentEmployee of employeeData) {
      const { _id, cpf, name, hiredAt } = currentEmployee;

      const hiredDate = formatDateToPtBr(hiredAt);
      await this.employeeModel.findOneAndUpdate(
        { _id },
        { cpf, name, hiredAt: hiredDate },
      );
    }
  }
}
