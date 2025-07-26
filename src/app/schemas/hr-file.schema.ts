import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type HRFileDocument = HydratedDocument<HRFile>;

@Schema()
export class HRFile {
  @ApiProperty({ example: 'Fatura de Cartão.pdf' })
  @Prop({ required: true, default: '' })
  name: string;

  @ApiProperty({
    example: '688137db08012ed3d428c9ba',
    description: 'Id do colaborador',
  })
  @Prop(
    raw({
      type: MongooseSchema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    }),
  )
  employeeId: string;

  @ApiProperty({
    example: '6884102a247fbdfb381c9d79',
    description: 'id do tipo de documento',
    required: false,
  })
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

  @ApiProperty({
    example:
      "Representação de um string contendo o documento, use  '' para um representar um arquivo vazio que será avaliado como pendente ",
  })
  @Prop({ required: false, default: '' })
  fileBase64: string;
}

export const HRFileSchema = SchemaFactory.createForClass(HRFile);

HRFileSchema.index({ employeeId: 1, hrFileTypeId: 1 }, { unique: true });
