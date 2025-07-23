import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileType } from 'src/app/schemas/file-type.schema';
import { HRFile } from 'src/app/schemas/hr-file.schema';
import { HrFileBindDTO, HrFileTypeDTO } from './dtos/file-type.dto';
import { FileTypeBind } from 'src/app/schemas/file-type-bind.schema';
import { HrFileDTO } from './dtos/hrfile.dto';

@Injectable()
export class HrFileService {
  constructor(
    @InjectModel(HRFile.name) private hrFileModel: Model<HRFile>,
    @InjectModel(FileType.name) private fileTypeModel: Model<FileType>,
    @InjectModel(FileTypeBind.name)
    private fyleTypeBindModel: Model<FileTypeBind>,
  ) {}

  async registerFileType(hrFileTypes: HrFileTypeDTO[]) {
    try {
      await this.fileTypeModel.insertMany(hrFileTypes);
    } catch (err) {
      console.log(
        '[FILE TYPE] Error while creating - body:',
        JSON.stringify(hrFileTypes),
        'Message: ',
        err.message,
      );
    }
  }

  async bindFileTypes(bindData: HrFileBindDTO) {
    return await this.fyleTypeBindModel.findOneAndUpdate(
      { id: bindData.data },
      { ...bindData },
    );
  }

  async saveHrFile(hrFileData: HrFileDTO) {
    const { employeedId, hrFileTypeId } = hrFileData;
    return await this.hrFileModel.updateOne(
      { employeedId, hrFileTypeId },
      { ...hrFileData },
      {
        upsert: true
      }
    );
    // return await this.hrFileModel.insertOne({
    //   ...hrFileData,
    //   status: hrFileData.base64FileString ? 'SENT' : 'PENDING',
    //   fileBase64: hrFileData.base64FileString ?? '',
    // });
  }

  async getDocumentationStatus(employeeId: string) {}
}
