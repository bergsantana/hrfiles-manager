import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HRFile, HRFileSchema } from 'src/app/schemas/hr-file.schema';
import { HrFileController } from './hrfile.controller';
import { HrFileService } from './hrfile.service';
import { FileType, FileTypeSchema } from 'src/app/schemas/file-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HRFile.name,
        schema: HRFileSchema,
      },
      {
        name: FileType.name,
        schema: FileTypeSchema,
      },
    ]),
  ],
  controllers: [HrFileController],
  providers: [HrFileService],
  exports: [HrFileService],
})
export class HrFileModule {}
