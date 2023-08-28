import { Controller,  HttpStatus,  ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiConsumes, ApiBody, ApiUnprocessableEntityResponse, ApiTooManyRequestsResponse, ApiOperation } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Throttle } from '@nestjs/throttler';


const allowedTypes: RegExp = /^image\/(jpeg|jpg|png)|^video\/(mp4|avi|mov)/;

@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) { }
  //2 request per 30 seconds 
  @Throttle(2, 30)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({
    description:"add files to a cloudinary server, client  is allow to send 2 post request per 30 seconds"
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')

  @ApiOkResponse({ description: 'se han enviado las imagenes' })
  @ApiUnprocessableEntityResponse({
    description: "Validation failed (expected type is /^image\/(jpeg|jpg|png)|^video\/(mp4|avi|mov)/)"
  })
  @ApiUnprocessableEntityResponse({
    description: "File is required"
  })
  @ApiTooManyRequestsResponse({
    description: "ThrottlerException: Too Many Requests"
  })
 
  public async uploadImages(
    @UploadedFiles(  
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType:allowedTypes,
      })
      .build({
        fileIsRequired:true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  ) files: Array<Express.Multer.File>): Promise<UploadApiResponse | UploadApiErrorResponse | string> {
    const result = await this.fileService.uploadFile(files);
    return "se han enviado las imagenes";
  }
}
