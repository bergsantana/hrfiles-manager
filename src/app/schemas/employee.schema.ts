import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true, default: new Date().toLocaleString('pt-BR') })
  hiredAt: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
