import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

const allowedTypes: RegExp = /^image\/(jpeg|jpg|png)|^video\/(mp4|avi|mov)/;

@Injectable()
export class FileMimetypePipe implements PipeTransform {
  transform(files: File[]): File[] {
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    for (const file of files) {
      if (!allowedTypes.test(file.type)) {
        throw new BadRequestException('Validation failed (expected type is /^image\\/(jpeg|jpg|png)|^video\\/(mp4|avi|mov)/)');
      }
    }

    return files;
  }
}
