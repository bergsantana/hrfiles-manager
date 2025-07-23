export interface HrFileTypeDTO {
  documentName: string;
}

export interface HrFileBindDTO {
  employeeId: string;
  data: {
    fileTypeId: string;
  }[];
}
