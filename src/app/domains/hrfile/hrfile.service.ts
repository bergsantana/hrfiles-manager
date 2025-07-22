import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileType } from 'src/app/schemas/file-type.schema';
import { HRFile } from 'src/app/schemas/hr-file.schema';
import { HrFileBindDTO, HrFileDTO } from './dtos/file-type.dto';
import { FileTypeBind } from 'src/app/schemas/file-type-bind.schema';

@Injectable()
export class HrFileService {
  constructor(
    @InjectModel(HrFileService.name) private hrFileModel: Model<HRFile>,
    @InjectModel(FileType.name) private fileTypeModel: Model<FileType>,
    @InjectModel(FileTypeBind.name)
    private fyleTypeBindModel: Model<FileTypeBind>,
  ) {}

  async registerFileType(hrFile: HrFileDTO[]) {
    return await this.fileTypeModel.insertMany(hrFile);
  }

  async bindFileTypes(bindData: HrFileBindDTO) {
    return await this.fyleTypeBindModel.findOneAndUpdate(
      { id: bindData.data },
      { ...bindData },
    );
  }
}
