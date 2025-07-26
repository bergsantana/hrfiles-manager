import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export type FileTypeDocument = HydratedDocument<FileType>;

@Schema()
export class FileType {
  @ApiProperty({ example: 'Comprovante de Residência'})
  @Prop({ required: true, unique: true })
  documentName: string;
}

export const FileTypeSchema = SchemaFactory.createForClass(FileType);
