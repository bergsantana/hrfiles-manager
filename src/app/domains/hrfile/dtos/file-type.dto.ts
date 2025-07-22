export interface HrFileDTO {
  id: string;
  name: string;
}

export interface HrFileBindDTO {
  employeeId: string;
  data: {
    filesTypesId: string;
    deleted?: boolean
  }[];
}
