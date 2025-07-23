import { Body, Controller, Post } from "@nestjs/common";
import { HrFileService } from "./hrfile.service";
import { HrFileBindDTO, HrFileTypeDTO } from "./dtos/file-type.dto";
import { HrFileDTO } from "./dtos/hrfile.dto";


@Controller('hrfile')
export class HrFileController {
    constructor( private readonly hrFileService: HrFileService) {}

    @Post('register-type')
    async registerFileType (@Body() fileTypes: HrFileTypeDTO[]) {
        console.log('body?', fileTypes)
        return await this.hrFileService.registerFileType(fileTypes)
    }

    @Post('bind-type-employee')
    async bindFileTypeEmployee(@Body() bindData: HrFileBindDTO){
        return await this.hrFileService.bindFileTypes(bindData)
    }

    @Post('save-file')
    async saveHrFile( @Body()  hrFileData: HrFileDTO){
        return await this.hrFileService.saveHrFile(hrFileData)
    }

}