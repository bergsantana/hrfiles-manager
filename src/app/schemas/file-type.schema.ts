import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export type FileTypeDocument = HydratedDocument<FileType>;

@Schema()
export class FileType {

  @Prop({ required: true, unique: true })
  documentName: string;
}

export const FileTypeSchema = SchemaFactory.createForClass(FileType);
