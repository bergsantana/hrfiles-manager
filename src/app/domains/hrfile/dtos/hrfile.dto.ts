import { ApiProperty } from '@nestjs/swagger';

export interface HrFileDTO {
  _id?: string;

  name?: string;

  employeeId: string;

  hrFileTypeId: string;

  status?: string;

  fileBase64?: string;
}

export class SearchFilesDTO {
  status: 'PENDING' | 'SENT';

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 'aabbbcceddddeeee', required: false })
  employeeId?: string;

  @ApiProperty({ example: 'aaaaaabbbbbbbcccdddeeee', required: false })
  hrFileTypeId?: string;
}

export interface SearchFileResponseDTO {
  page: number;

  pageSize: number;

  totalCount: number;

  data: HrFileDTO[];

  employeeId?: string;

  hrFileTypeId?: string;
}

export interface GetAllDocumentationStatusResponseDTO {
  sent?: { documentType: string }[];
  pending?: { documentType: string }[];
  error?: string;
}
