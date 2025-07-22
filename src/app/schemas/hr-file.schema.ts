import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HRFileDocument = HydratedDocument<HRFile>;

@Schema()
export class HRFile {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  employeedId: string;

  @Prop({ required: true })
  hrFileTypeId: string;

  @Prop({ required: false })
  bufferData: string
}

export const HRFileSchema = SchemaFactory.createForClass(HRFile);
