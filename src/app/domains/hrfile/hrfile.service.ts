import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FileType } from 'src/app/schemas/file-type.schema';
import { HRFile } from 'src/app/schemas/hr-file.schema';
import { HrFileTypeDTO } from './dtos/file-type.dto';
import { HrFileDTO, SearchFilesDTO } from './dtos/hrfile.dto';
import { stat } from 'fs';

@Injectable()
export class HrFileService {
  constructor(
    @InjectModel(HRFile.name) private hrFileModel: Model<HRFile>,
    @InjectModel(FileType.name) private fileTypeModel: Model<FileType>,
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

  async saveHrFile(hrFileData: HrFileDTO[]) {
    console.log('fuc params', hrFileData);
    try {
      for (const bind of hrFileData) {
        console.log('this bind', bind);
        const { employeeId, hrFileTypeId, fileBase64 } = bind;
        await this.hrFileModel.updateOne(
          { employeeId, hrFileTypeId },
          {
            ...hrFileData,
            status: fileBase64 ? 'SENT' : 'PENDING',
            fileBase64,
          },
          {
            upsert: true,
          },
        );
      }
    } catch (err) {
      console.log(
        `[SAVING HR FILE] Error while saving Human Resources Document - message: ${err.message}`,
      );
    }
  }

  async getAllDocumentationStatus(employeeId: string) {
    const where = {
      employeeId: new Types.ObjectId(employeeId),
    };

    const result = await this.hrFileModel.aggregate([
      {
        $match: where,
      },

      {
        $lookup: {
          from: 'filetypes',
          localField: 'hrFileTypeId',
          foreignField: '_id',
          as: 'documentData',
        },
      },
      { $unwind: '$documentData' },
      {
        $group: {
          _id: null,

          sent: {
            $push: {
              $cond: [
                { $eq: ['$status', 'SENT'] },
                {
                  documentType: '$documentData.documentName',
                },
                '$$REMOVE',
              ],
            },
          },
          pending: {
            $push: {
              $cond: [
                { $eq: ['$status', 'PENDING'] },
                {
                  documentType: '$documentData.documentName',
                },
                '$$REMOVE',
              ],
            },
          },
        },
      },
    ]);

    return result;
  }

  async allPendingDocuments(where: SearchFilesDTO) {
    const { page, pageSize, status, employeeId, hrFileTypeId } = where;
    const $and: {}[] = [{ status }];
    if (employeeId) $and.push({ employeeId: new Types.ObjectId(employeeId) });
    if (hrFileTypeId)
      $and.push({ hrFileTypeId: new Types.ObjectId(hrFileTypeId) });

    return this.hrFileModel.aggregate([
      { $match: { $and } },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
  }
}
