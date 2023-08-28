import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

describe('FilesController', () => {
  let filesController: FilesController;
  let filesService: FilesService;
  const msg = "se han enviado las imagenes";
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [FilesController],
        providers: [FilesService],
      }).compile();

    filesService = moduleRef.get<FilesService>(FilesService);
    filesController = moduleRef.get<FilesController>(FilesController);
  });


  describe('uploadFile', () => {
    it('should return a sentence to let the client know that the files are uploaded', async () => {
      let result:Promise<(UploadApiResponse | UploadApiErrorResponse)[]>;
      const mockUploadedFiles: any[] = [
        {
          filename: 'image',
          originalname: 'example.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          size: 1000,
          buffer: Buffer.from('Mock file content'),
        },
        {
          filename: 'video',
          originalname: 'exampleVideo.mp4',
          encoding: '7bit',
          mimetype: 'video/mp4',
          size: 10000,
          buffer: Buffer.from('Mock video content'),
        },
        // Add more files if needed
      ];
      jest.spyOn(filesService, 'uploadFile').mockImplementation(() => result);
      expect(await filesController.uploadImages(mockUploadedFiles)).toBe(msg);
    });

    it('if the files uploaded are not videos or images  the conmtroller is going to return the message because the controller logic does not validate the type', async () => {
      let result:Promise<(UploadApiResponse | UploadApiErrorResponse)[]>;
      const mockUploadedFiles: any[] = [
        { 
          filename: 'error.txt', // Cambiar el nombre de archivo para tener extensión .txt
          originalname: 'testError.txt', // Cambiar el nombre original del archivo
          encoding: '7bit',
          mimetype: 'text/plain', // Cambiar el mimetype a 'text/plain'
          size: 10000,
          buffer: Buffer.from('test file, is an text file  should not be allowed to be uploaded'), // Proporcionar el contenido del archivo como texto
        },
      ];
      jest.spyOn(filesService, 'uploadFile').mockImplementation(() => result);
      expect(await filesController.uploadImages(mockUploadedFiles)).toBe(msg);
    });

    it('if no files are uploaded the controller should send the message anyway, the validation is in the pipe not in the controller', async () => {
      let result:Promise<(UploadApiResponse | UploadApiErrorResponse)[]>;
      const mockUploadedFiles: any[] = [];
      jest.spyOn(filesService, 'uploadFile').mockImplementation(() => result);
      expect(await filesController.uploadImages(mockUploadedFiles)).toBe(msg);
    });
  });
});
