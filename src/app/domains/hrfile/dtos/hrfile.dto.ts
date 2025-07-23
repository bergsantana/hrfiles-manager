export interface HrFileDTO {
  name?: string;

  employeeId: string;

  hrFileTypeId: string;

  status?: string;

  fileBase64?: string;
}

export interface SearchFilesDTO {
  status: 'PENDING' | 'SENT';

  page: number;

  pageSize: number;

  employeeId?: string;

  hrFileTypeId?: string;
}
