import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

import { Readable } from 'stream';
@Injectable()
@Injectable()
export class FilesService {

  async uploadToCloudinary(
    files: Array<Express.Multer.File>,
  ): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    const uploadPromises: Promise<UploadApiResponse | UploadApiErrorResponse>[] = [];

    files.forEach((file) => {
      const uploadPromise = new Promise<UploadApiResponse | UploadApiErrorResponse>((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            public_id:file.originalname,
            unique_filename:false,
            use_filename:true,
            upload_preset: "ckcqwyj6",
            resource_type:"auto",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        let str = Readable.from(file.buffer);
        str.pipe(upload);
      });

      uploadPromises.push(uploadPromise);
    });
    return Promise.all(uploadPromises);
  }

  async uploadFile(files: Array<Express.Multer.File>) {
    try {
      return await this.uploadToCloudinary(files);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
