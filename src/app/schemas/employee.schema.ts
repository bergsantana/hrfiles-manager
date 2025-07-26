import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @ApiProperty({ example: 'Julia José'})
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: '123.123.123-15'})
  @Prop({ required: true })
  cpf: string;

  @ApiProperty({ example: '28/02/1984'})
  @Prop({ required: true, default: new Date().toLocaleString('pt-BR') })
  hiredAt: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
