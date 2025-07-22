import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileTypeBindDocument = HydratedDocument<FileTypeBind>;

@Schema()
export class FileTypeBind {
  @Prop({ required: false })
  employeeId: string;

  @Prop({ required: true })
  data: [
    {
      filesTypesId: { type: String };
      deleted: { type: Boolean };
    },
  ];
}

export const FileTypeBindSchema = SchemaFactory.createForClass(FileTypeBind);
