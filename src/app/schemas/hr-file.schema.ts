import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type HRFileDocument = HydratedDocument<HRFile>;

@Schema()
export class HRFile {
  @Prop({ required: true, default: '' })
  name: string;

  @Prop(
    raw({
      type: MongooseSchema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    }),
  )
  employeeId: string;

  @Prop(
    raw({
      type: MongooseSchema.Types.ObjectId,
      ref: 'FileType',
      required: true,
    }),
  )
  hrFileTypeId: string;

  @Prop({ required: true, default: 'PENDING' })
  status: 'SENT' | 'PENDING';

  @Prop({ required: false, default: '' })
  fileBase64: string;
}

export const HRFileSchema = SchemaFactory.createForClass(HRFile);

HRFileSchema.index({ employeeId: 1, hrFileTypeId: 1 }, { unique: true });
