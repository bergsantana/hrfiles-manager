import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true, default: uuidv4() })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true, default: new Date().toLocaleString('pt-BR') })
  hiredAt: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
