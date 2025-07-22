import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileTypeDocument = HydratedDocument<FileType>;

@Schema()
export class FileType {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;
}

export const FileTypeSchema = SchemaFactory.createForClass(FileType);
