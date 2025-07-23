export interface HrFileDTO {
  name: string;

  employeedId: string;

  hrFileTypeId: string;

  status?: string;
  
  base64FileString?: string;
}
