import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FileType } from 'src/app/schemas/file-type.schema';
import { HRFile } from 'src/app/schemas/hr-file.schema';
import { HrFileTypeDTO } from './dtos/file-type.dto';
import {
  GetAllDocumentationStatusResponseDTO,
  HrFileDTO,
  SearchFileResponseDTO,
  SearchFilesDTO,
} from './dtos/hrfile.dto';

@Injectable()
export class HrFileService {
  private readonly logger = new Logger(HrFileService.name, { timestamp: true });

  constructor(
    @InjectModel(HRFile.name) private hrFileModel: Model<HRFile>,
    @InjectModel(FileType.name) private fileTypeModel: Model<FileType>,
  ) {}

  async registerFileType(hrFileTypes: HrFileTypeDTO[]) {
    try {
      await this.fileTypeModel.insertMany(hrFileTypes);
    } catch (err) {
      this.logger.error(
        '[FILE TYPE] Error while creating - body:',
        JSON.stringify(hrFileTypes),
        'Message: ',
        err.message,
      );
    }
  }

  async listAllTypes() {
    try {
      return await this.fileTypeModel.find();
    } catch (error) {
      this.logger.error(`[LIST ALL TYPES ] Error: ${error.message}`);
    }
  }

  async saveHrFile(hrFileData: HrFileDTO[]) {
    try {
      for (const bind of hrFileData) {
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
      this.logger.error(
        `[SAVING HR FILE] Error while saving Human Resources Document - message: ${err.message}`,
      );
    }
  }

  async getAllDocumentationStatus(
    employeeId: string,
  ): Promise<GetAllDocumentationStatusResponseDTO> {
    try {
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

      return result[0] as GetAllDocumentationStatusResponseDTO;
    } catch (err) {
      this.logger.error(
        `[HR FILES SERVICE] Error while retrieving - employee id: ${employeeId} - message: ${err.message}`,
      );
      return {
        error: err.message,
      };
    }
  }

  async allPendingDocuments(
    where: SearchFilesDTO,
  ): Promise<SearchFileResponseDTO | undefined> {
    try {
      const { page, pageSize, status, employeeId, hrFileTypeId } = where;
      const $and: {}[] = [{ status }];
      if (employeeId) $and.push({ employeeId: new Types.ObjectId(employeeId) });
      if (hrFileTypeId)
        $and.push({ hrFileTypeId: new Types.ObjectId(hrFileTypeId) });

      const response = await this.hrFileModel.aggregate([
        { $match: { $and } },
        {
          $facet: {
            metadata: [{ $count: 'totalCount' }],
            data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          },
        },
      ]);

      const data = response[0]?.data as HrFileDTO[];
      const totalCount = response[0]?.metadata[0]?.totalCount as number;
      return {
        page,
        pageSize,
        totalCount,
        data,
        employeeId,
        hrFileTypeId,
      };
    } catch (err) {
      this.logger.error(
        `[LISTING ALL PENDING DOCUMENTS] Error filtering by: ${JSON.stringify(where)} `,
      );
    }
  }
}
