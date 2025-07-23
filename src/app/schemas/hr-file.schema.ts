import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type HRFileDocument = HydratedDocument<HRFile>;

@Schema()
export class HRFile {
  @Prop({ required: true, unique: true, default: uuidv4() })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: 'SENT' | 'PENDING';

  @Prop()
  employeedId: string;

  @Prop({ required: true })
  hrFileTypeId: string;

  @Prop({ required: false })
  fileBase64: string
}

export const HRFileSchema = SchemaFactory.createForClass(HRFile);

HRFileSchema.index({ employeeId: 1, hrFileTypeId: 1 }, { unique: true });