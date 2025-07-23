export interface HrFileTypeDTO {
  id?: string;
  name: string;
}

export interface HrFileBindDTO {
  employeeId: string;
  data: {
    fileTypeId: string;
    deleted?: boolean
  }[];
}
